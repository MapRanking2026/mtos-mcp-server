import server from "../../mcp/index.js";
import { getTeams } from "../../providers/clickup/index.js";

server.tool(
  "clickup_teams",
  "Get the list of ClickUp teams",
  {},
  async () => {
    const data = await getTeams();
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);
