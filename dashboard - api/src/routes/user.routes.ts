import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

// GET /api/users/profile - Get the current user's profile (protected route)
router.get("/profile", authMiddleware, getUserProfile);

// PUT /api/users/profile - Update the current user's profile (protected route)
router.put("/profile", authMiddleware, updateUserProfile);

export default router;
