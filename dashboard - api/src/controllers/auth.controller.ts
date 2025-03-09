import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import redisClient from "../services/redis.service";
import { v4 as uuidv4 } from "uuid";
import LoginHistory from "../models/LoginHistory";
import Joi from "joi";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate a unique session ID
    const sessionId = uuidv4();
    const role = user.role;
    // Create tokens
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: "7d" }
    );

    // Store refresh token in Redis with expiration (7 days in seconds)
    const redisKey = `refresh:${user._id}:${sessionId}`;
    await redisClient.setEx(redisKey, 60 * 60 * 24 * 7, refreshToken);

    // Track active sessions for the user
    await redisClient.sAdd(`sessions:${user._id}`, sessionId);
    // Record login history: capture IP address and user-agent
    const ipAddress =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    const userAgent = req.headers["user-agent"] || "";
    await LoginHistory.create({
      user: user._id,
      sessionId,
      ipAddress: typeof ipAddress === "string" ? ipAddress : ipAddress[0],
      userAgent: Array.isArray(userAgent) ? userAgent.join(" ") : userAgent,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    // Set the user's role as an httpOnly cookie
    res.cookie("role", user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (adjust as needed)
    });

    // Set the refresh token as an httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // set to true in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    // Return access token and sessionId in response (do not send refresh token in JSON)
    res.json({ accessToken, sessionId, role });
  } catch (error) {
    next(error);
  }
};

// Define Joi schema for registration
const registerSchema = Joi.object({
  firstname: Joi.string().required().messages({
    "string.empty": "First name is required",
  }),
  lastname: Joi.string().required().messages({
    "string.empty": "Last name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "A valid email is required",
    "string.empty": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.empty": "Password is required",
  }),
  address: Joi.string().allow(""),
  phoneNumber: Joi.string().allow(""),
  role: Joi.string().default("user"),
  gender: Joi.string().allow(""),
  country: Joi.string().allow(""),
});

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Validate request body against the schema
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    // Destructure validated fields
    const {
      firstname,
      lastname,
      email,
      password,
      address,
      phoneNumber,
      role,
      gender,
      country,
    } = value;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user. You can store firstname & lastname as separate fields.
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      role,
      gender,
      country,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Look for refreshToken in body and cookie (cookie takes precedence)
    const incomingToken = req.cookies?.refreshToken || req.body.refreshToken;
    const { sessionId } = req.body;

    if (!incomingToken || !sessionId) {
      res
        .status(400)
        .json({ message: "Refresh token and session ID required" });
      return;
    }

    // Verify the incoming refresh token
    let decoded: any;
    try {
      decoded = jwt.verify(
        incomingToken,
        process.env.JWT_REFRESH_SECRET as string
      );
    } catch (err) {
      res.status(401).json({ message: "Invalid refresh token" });
      return;
    }

    const redisKey = `refresh:${decoded.id}:${sessionId}`;
    const storedToken = await redisClient.get(redisKey);
    if (!storedToken || storedToken !== incomingToken) {
      res.status(401).json({ message: "Refresh token invalid or expired" });
      return;
    }

    // Generate new tokens
    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );
    const newRefreshToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: "7d" }
    );

    // Replace the old refresh token in Redis (rotate token)
    await redisClient.setEx(redisKey, 60 * 60 * 24 * 7, newRefreshToken);

    // Update the httpOnly cookie with the new refresh token
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken: newAccessToken, sessionId });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { sessionId } = req.body;
    // Use refresh token from cookie if available
    const incomingToken = req.cookies?.refreshToken || req.body.refreshToken;
    if (!sessionId || !incomingToken) {
      res
        .status(400)
        .json({ message: "Session ID and refresh token required" });
      return;
    }

    // Verify token to extract user id
    let decoded: any;
    try {
      decoded = jwt.verify(
        incomingToken,
        process.env.JWT_REFRESH_SECRET as string
      );
    } catch (err) {
      res.status(401).json({ message: "Invalid refresh token" });
      return;
    }

    const redisKey = `refresh:${decoded.id}:${sessionId}`;
    // Remove the refresh token and session record from Redis
    await redisClient.del(redisKey);
    await redisClient.sRem(`sessions:${decoded.id}`, sessionId);

    // Clear the refresh token cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Set the user's role as an httpOnly cookie
    res.clearCookie("role", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.clearCookie("sessionId", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const forceLogoutAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Option 1: Delete using the stored sessions set with a pipeline.
    const sessions = await redisClient.sMembers(`sessions:${userId}`);
    const pipeline = redisClient.multi();
    for (const sessionId of sessions) {
      pipeline.del(`refresh:${userId}:${sessionId}`);
    }
    pipeline.del(`sessions:${userId}`);
    await pipeline.exec();

    // Option 2: As an extra safeguard, delete any refresh token keys matching the pattern.
    // Note: Use the spread operator so that the keys array is passed as separate arguments.
    const keys = await redisClient.keys(`refresh:${userId}:*`);

    if (keys.length > 0) {
      await redisClient.del(keys);
    }
    res.json({
      message:
        "All sessions and refresh tokens removed. Logged out from all devices.",
    });
  } catch (error) {
    next(error);
  }
};
