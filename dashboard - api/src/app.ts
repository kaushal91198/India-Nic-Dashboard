import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import errorMiddleware from './middlewares/error.middleware';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import authMiddleware from './middlewares/auth.middleware';
import rateLimit from 'express-rate-limit';
import rateLimiter from './middlewares/rateLimiter.middleware';

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
// CORS configuration: allow React app running on http://localhost:5173
// Configure CORS with proper options:
app.use(cors({
    origin: 'http://localhost:5173', // React app URL
    credentials: true, // Allow cookies and other credentials
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  }));
  
  // (Optional) Handle preflight requests explicitly:
  app.options('*', cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
app.use(express.urlencoded({ extended: true }));

// Add cookie parser
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);

app.get('/api/auth/status', authMiddleware, rateLimiter, (req, res) => {
  const role = req.cookies.role; // using cookie-parser to read the httpOnly cookie
  res.status(200).json({ userId: req.user, role });
});

app.use(errorMiddleware);

export default app;
