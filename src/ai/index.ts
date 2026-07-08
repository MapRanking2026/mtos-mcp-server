import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import { getAccounts as getGmbAccounts } from "../providers/google/gmb.js";
import { getAccounts as getGa4Accounts } from "../providers/google/ga4.js";
import { getSites as getSearchConsoleSites } from "../providers/google/search-console.js";
import { getAccounts as getGoogleAdsAccounts } from "../providers/google/ads.js";
import { getAdAccounts as getMetaAdsAccounts } from "../providers/meta/ads.js";
import { getLocations as getGoHighLevelLocations } from "../providers/gohighlevel/index.js";
import { getTeams as getClickUpTeams } from "../providers/clickup/index.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const model = "gemini-2.5-flash";

export const generate30DayBusinessMonthlyTouch = async (propertyId: string) => {
  const gmbAccounts = await getGmbAccounts();
  const ga4Accounts = await getGa4Accounts(propertyId);
  const searchConsoleSites = await getSearchConsoleSites();
  const googleAdsAccounts = await getGoogleAdsAccounts();
  const metaAdsAccounts = await getMetaAdsAccounts();
  const goHighLevelLocations = await getGoHighLevelLocations();
  const clickUpTeams = await getClickUpTeams();

  const prompt = `
    Generate a 30-day Business Monthly Touch based on the following data:

    Google My Business Accounts:
    ${JSON.stringify(gmbAccounts, null, 2)}

    Google Analytics 4 Accounts:
    ${JSON.stringify(ga4Accounts, null, 2)}

    Google Search Console Sites:
    ${JSON.stringify(searchConsoleSites, null, 2)}

    Google Ads Accounts:
    ${JSON.stringify(googleAdsAccounts, null, 2)}

    Meta Ads Accounts:
    ${JSON.stringify(metaAdsAccounts, null, 2)}

    GoHighLevel Locations:
    ${JSON.stringify(goHighLevelLocations, null, 2)}

    ClickUp Teams:
    ${JSON.stringify(clickUpTeams, null, 2)}
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  });
  return response.text;
};
