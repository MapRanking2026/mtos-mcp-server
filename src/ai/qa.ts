import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const model = "gemini-2.5-flash";

export const evaluate30DayBusinessMonthlyTouch = async (report: string) => {
  const prompt = `
    Please evaluate the following 30-day Business Monthly Touch.
    Check for completeness, accuracy, consistency, and required sections.

    Report:
    ${report}
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  });
  return response.text;
};
