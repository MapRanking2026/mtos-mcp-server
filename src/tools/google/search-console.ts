import server from "../../mcp/index.js";
import { getSites } from "../../providers/google/search-console.js";

server.tool(
  "google_search_console_sites",
  "Get the list of Google Search Console sites",
  {},
  async () => {
    const data = await getSites();
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);
