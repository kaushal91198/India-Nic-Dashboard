import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILoginHistory extends Document {
  user: mongoose.Types.ObjectId;
  sessionId: string;
  ipAddress: string;
  userAgent: string;
  loginTime: Date;
}

const LoginHistorySchema: Schema<ILoginHistory> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  sessionId: { type: String, required: true },
  ipAddress: { type: String, required: true },
  userAgent: { type: String, required: false },
  loginTime: { type: Date, default: Date.now },
});

const LoginHistory: Model<ILoginHistory> = mongoose.model<ILoginHistory>(
  "LoginHistory",
  LoginHistorySchema
);

export default LoginHistory;
