import dotenv from "dotenv";

dotenv.config();

export const config = {
  apiBase: process.env.API_BASE_URL!,
  bearerToken: process.env.MAPRANKING_BEARER!,
};