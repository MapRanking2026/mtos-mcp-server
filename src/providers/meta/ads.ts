import axios from "axios";
import "dotenv/config";

const graph = axios.create({
  baseURL: "https://graph.facebook.com/v20.0",
});

export const getAdAccounts = async () => {
  const res = await graph.get("/me/adaccounts", {
    params: {
      access_token: process.env.META_ADS_ACCESS_TOKEN,
      fields: "name,account_id",
    },
  });
  return res.data;
};
