import { z } from "zod";
import server from "../../mcp/index.js";
import { evaluate30DayBusinessMonthlyTouch } from "../../ai/qa.js";

server.tool(
  "evaluate_30_day_business_monthly_touch",
  "Evaluate a 30-day Business Monthly Touch",
  {
    report: z.string(),
  },
  async (params: { report: string }) => {
    const data = await evaluate30DayBusinessMonthlyTouch(params.report);
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);
