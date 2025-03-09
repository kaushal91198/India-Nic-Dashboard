import { Router } from "express";
import {
  login,
  register,
  refreshToken,
  logout,
  forceLogoutAll,
} from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

// POST /api/auth/login - Handle user login
router.post("/login", login);

// POST /api/auth/register - Handle user registration
router.post("/register", register);

// POST /api/auth/refresh-token - Handle token refresh
router.post("/refresh-token", refreshToken);

// POST /api/auth/logout - Handle token refresh
router.post("/logout", logout);

// POST /api/auth/logout-all - Handle token refresh
router.post("/logout-all", authMiddleware, forceLogoutAll);
export default router;
