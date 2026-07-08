import { z } from "zod";
import server from "../../mcp/index.js";
import { getAccounts } from "../../providers/google/ga4.js";

server.tool(
  "google_analytics_4_accounts",
  "Get the list of Google Analytics 4 accounts",
  {
    propertyId: z.string(),
  },
  async (params: { propertyId: string }) => {
    const data = await getAccounts(params.propertyId);
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);
