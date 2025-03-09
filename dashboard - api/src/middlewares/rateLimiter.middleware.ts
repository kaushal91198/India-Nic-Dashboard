import { Request, Response, NextFunction } from "express";
import redisClient from "../services/redis.service";

const RATE_LIMIT_WINDOW = 60; // in seconds
const MAX_REQUESTS = 100; // maximum requests per window

const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const ip = req.ip;
    const key = `rate:${ip}`;
    const current = await redisClient.incr(key);

    if (current === 1) {
      await redisClient.expire(key, RATE_LIMIT_WINDOW);
    }

    if (current > MAX_REQUESTS) {
      res
        .status(429)
        .json({ message: "Too many requests. Please try again later." });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default rateLimiter;
