import { google } from "googleapis";
import oauth2Client from "./client.js";

const analyticsdataV1beta = google.analyticsdata({
  version: "v1beta",
  auth: oauth2Client,
});

export const getAccounts = async (propertyId: string) => {
  const res = await analyticsdataV1beta.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: {
      dimensions: [{ name: "country" }],
      metrics: [{ name: "activeUsers" }],
      dateRanges: [{ startDate: "2020-03-31", endDate: "today" }],
    },
  });
  return res.data;
};
