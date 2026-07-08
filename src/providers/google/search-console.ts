import { google } from "googleapis";
import oauth2Client from "./client.js";

const searchconsoleV1 = google.searchconsole({
  version: "v1",
  auth: oauth2Client,
});

export const getSites = async () => {
  const res = await searchconsoleV1.sites.list({});
  return res.data;
};
