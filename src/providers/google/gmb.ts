import { google } from "googleapis";
import oauth2Client from "./client.js";

const mybusinessaccountmanagementV1 = google.mybusinessaccountmanagement({
  version: "v1",
  auth: oauth2Client,
});

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

const isRateLimitError = (error: unknown) => {
  const status = (error as { status?: number; response?: { status?: number } })
    ?.status ?? (error as { response?: { status?: number } })?.response?.status;
  return status === 429;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAccounts = async () => {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await mybusinessaccountmanagementV1.accounts.list({});
      return res.data;
    } catch (error) {
      if (!isRateLimitError(error) || attempt === MAX_RETRIES) {
        throw error;
      }
      await sleep(BASE_DELAY_MS * 2 ** attempt);
    }
  }
};
