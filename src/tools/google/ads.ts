import server from "../../mcp/index.js";
import { getAccounts } from "../../providers/google/ads.js";

server.tool(
  "google_ads_accounts",
  "Get the list of Google Ads accounts",
  {},
  async () => {
    const data = await getAccounts();
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);
