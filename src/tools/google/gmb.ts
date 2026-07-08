import server from "../../mcp/index.js";
import { getAccounts } from "../../providers/google/gmb.js";

server.tool(
  "google_my_business_accounts",
  "Get the list of Google My Business accounts",
  {},
  async () => {
    const data = await getAccounts();
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);
