import axios from "axios";
import "dotenv/config";

const clickup = axios.create({
  baseURL: "https://api.clickup.com/api/v2",
});

export const getTeams = async () => {
  const res = await clickup.get("/team", {
    headers: {
      Authorization: process.env.CLICKUP_API_TOKEN,
    },
  });
  return res.data;
};
