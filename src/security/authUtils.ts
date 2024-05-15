import { API_URL } from "../settings";
import { makeOptions, handleHttpErrors } from "../services/fetchUtils";
const LOGIN_URL = API_URL + "/auth/login";

export type User = { username: string; password: string; roles?: string[] };

export interface LoginResponse {
  username: string;
  token: string;
  roles: Array<string>;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export const authProvider = {
  isAuthenticated: false,
  async signIn(user_: LoginRequest): Promise<LoginResponse> {
    const options = makeOptions("POST", user_);
    const res = await fetch(LOGIN_URL, options);
      return handleHttpErrors(res);
  },
};

