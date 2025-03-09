import { Profile } from "../common/common";

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface loginAPIResponse {
  accessToken: string;
  sessionId: string;
  role: string;
}

export interface signupAPIResponse {
  accessToken: string;
  sessionId: string;
}

export interface logoutAPIResponse {}

export interface logoutAlldeviceAPIResponse {}

export interface getProfileAPIResponse extends Profile {}
