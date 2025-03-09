declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service";

interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}

const authMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Retrieve the access token from the Authorization header or cookie.
    let token =
      req.headers.authorization?.split(" ")[1] || req.cookies?.accessToken;

    if (!token) {
      // If no access token is provided, try the refresh flow (omitted for brevity).
      // ...
      res.status(401).json({ message: "Authorization token missing" });
      return;
    }

    // Verify the access token.
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    req.user = decoded;

    // Additional check: verify that a sessionId cookie is present.
    const sessionId = req.cookies?.sessionId;
    if (!sessionId) {
      res.status(401).json({ message: "Session ID missing" });
      return;
    }

    // Check that this sessionId is valid for the user in Redis.
    const sessions = await redisClient.sMembers(
      `sessions:${String(decoded.id)}`
    );
    if (!sessions.includes(sessionId)) {
      res.status(401).json({ message: "Invalid or expired session" });
      return;
    }

    // All checks passed.
    next();
  } catch (error: any) {
    // If error is TokenExpiredError, then attempt refresh logic here.
    if (error.name === "TokenExpiredError") {
      // ... (refresh flow logic as before)
      // For brevity, see your previous refresh code.
    }
    // Otherwise, clear cookies and respond with 401.
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

    res.status(401).json({
      message: "Unauthorized access",
      error: error.message,
    });
  }
};

export default authMiddleware;
