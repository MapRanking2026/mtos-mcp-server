import { z } from "zod";
import server from "../../mcp/index.js";
import { generate30DayBusinessMonthlyTouch } from "../../ai/index.js";

server.tool(
  "generate_30_day_business_monthly_touch",
  "Generate a 30-day Business Monthly Touch",
  {
    propertyId: z.string(),
  },
  async (params: { propertyId: string }) => {
    const data = await generate30DayBusinessMonthlyTouch(params.propertyId);
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);
