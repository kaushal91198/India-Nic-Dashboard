import { Request, Response, NextFunction } from "express";

function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Error middleware caught an error:", err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ status, message });
}

export default errorMiddleware;
