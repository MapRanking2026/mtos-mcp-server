import { z } from "zod";
import server from "../../mcp/index.js";
import { getCheckinDashboard } from "../../providers/mapranking/checkins.js";

server.tool(
  "checkin_dashboard",
  "Get the checkin dashboard",
  {
    page: z.number().optional(),
    search: z.string().optional(),
    limit: z.number().optional(),
  },
  async (params: { page?: number; search?: string; limit?: number }) => {
    const { page = 1, search = "", limit = 10 } = params;
    const data = await getCheckinDashboard(page, search, limit);
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);
