import axios from "axios";
import "dotenv/config";

const gohighlevel = axios.create({
  baseURL: "https://services.leadconnectorhq.com",
  headers: {
    Version: "2021-07-28",
  },
});

export const getLocations = async () => {
  const res = await gohighlevel.get("/locations/search", {
    headers: {
      Authorization: process.env.GOHIGHLEVEL_ACCESS_TOKEN,
    },
  });
  return res.data;
};
