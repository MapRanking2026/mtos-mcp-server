import server from "../../mcp/index.js";
import { getBusinesses } from "../../providers/mapranking/business.js";

server.tool(
  "businesses",
  "Get the list of businesses",
  {},
  async () => {
    const data = await getBusinesses();
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);
