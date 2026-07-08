import server from "../../mcp/index.js";
import { getAdAccounts } from "../../providers/meta/ads.js";

server.tool(
  "meta_ads_accounts",
  "Get the list of Meta Ads accounts",
  {},
  async () => {
    const data = await getAdAccounts();
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);
