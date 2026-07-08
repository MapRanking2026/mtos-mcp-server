import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

let token: string | null = null;

export async function getAccessToken(): Promise<string> {
  if (token) {
    return token;
  }

  const response = await axios.post(
    `${process.env.API_BASE_URL}/auth/login`,
    {
      email: process.env.LOGIN_EMAIL,
      password: process.env.LOGIN_PASSWORD,
      type: "email",
      token: ""
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  token = response.data.data.token;

  return token!;
}

export function clearToken() {
  token = null;
}