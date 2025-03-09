import { Profile } from "../common/common";

export interface loginAPIRequest {
  email: string;
  password: string;
}

export interface signupAPIRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  role: string; // Add other roles as needed "admin" or "user"
  gender: string;
  country: string;
}

export interface logoutAPIRequest {
  sessionId: string;
}
export interface logoutAllAPIRequest {}

export interface logoutAlldeviceAPIRequest {}

export interface getProfileAPIRequest extends Profile {}
