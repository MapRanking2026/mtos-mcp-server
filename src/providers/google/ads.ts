import { GoogleAdsApi } from "google-ads-api";

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_CLIENT_ID as string,
  client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN as string,
});

export const getAccounts = async () => {
  const res = await client.listAccessibleCustomers(
    process.env.GOOGLE_REFRESH_TOKEN as string
  );
  return res;
};
