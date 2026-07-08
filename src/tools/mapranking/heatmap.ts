import { z } from "zod";
import server from "../../mcp/index.js";
import { getHeatmap } from "../../providers/mapranking/heatmap.js";

server.tool(
  "heatmap",
  "Get the heatmap",
  {
    heatmapId: z.string(),
  },
  async (params: { heatmapId: string }) => {
    const data = await getHeatmap(params.heatmapId);
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);
