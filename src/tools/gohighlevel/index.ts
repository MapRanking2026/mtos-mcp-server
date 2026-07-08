import server from "../../mcp/index.js";
import { getLocations } from "../../providers/gohighlevel/index.js";

server.tool(
  "gohighlevel_locations",
  "Get the list of GoHighLevel locations",
  {},
  async () => {
    const data = await getLocations();
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);
