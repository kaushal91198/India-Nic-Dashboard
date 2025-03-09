import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFormInputs extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  role: string; // e.g., "user", "admin"
  gender: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IFormInputs> = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    address: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    role: { type: String, default: "user" },
    gender: { type: String, default: "" },
    country: { type: String, default: "" },
  },
  { timestamps: true }
);

const User: Model<IFormInputs> = mongoose.model<IFormInputs>(
  "User",
  UserSchema
);

export default User;
