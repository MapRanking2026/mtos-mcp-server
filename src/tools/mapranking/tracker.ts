import { z } from "zod";
import server from "../../mcp/index.js";
import { getTrackerDashboard } from "../../providers/mapranking/tracker.js";

server.tool(
  "tracker_dashboard",
  "Get the tracker dashboard",
  {
    page: z.number().optional(),
    search: z.string().optional(),
    limit: z.number().optional(),
  },
  async (params: { page?: number; search?: string; limit?: number }) => {
    const { page = 1, search = "", limit = 10 } = params;
    const data = await getTrackerDashboard(page, search, limit);
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);
