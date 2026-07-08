import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import { getAccounts as getGmbAccounts } from "../providers/google/gmb.js";
import { getAccounts as getGa4Accounts } from "../providers/google/ga4.js";
import { getSites as getSearchConsoleSites } from "../providers/google/search-console.js";
import { getAccounts as getGoogleAdsAccounts } from "../providers/google/ads.js";
import { getAdAccounts as getMetaAdsAccounts } from "../providers/meta/ads.js";
import { getLocations as getGoHighLevelLocations } from "../providers/gohighlevel/index.js";
import { getTeams as getClickUpTeams } from "../providers/clickup/index.js";
import { getClientActiveServices } from "../providers/clickup/healthTracker.js";
import { getTrackerDashboard } from "../providers/mapranking/tracker.js";
import { getCheckinDashboard } from "../providers/mapranking/checkins.js";
import { SERVICE_TO_SOURCE } from "./serviceMap.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const model = "gemini-2.5-flash";

export const generate30DayBusinessMonthlyTouch = async (
  businessName: string,
  propertyId?: string
) => {
  const activeServices = await getClientActiveServices(businessName);
  const activeSources = new Set(
    activeServices.flatMap((service) => SERVICE_TO_SOURCE[service] ?? [])
  );

  const sections: string[] = [];

  if (activeSources.has("gmb")) {
    const data = await getGmbAccounts();
    sections.push(`Google My Business Accounts:\n${JSON.stringify(data, null, 2)}`);
  }
  if (activeSources.has("ga4") && propertyId) {
    const data = await getGa4Accounts(propertyId);
    sections.push(`Google Analytics 4 Accounts:\n${JSON.stringify(data, null, 2)}`);
  }
  if (activeSources.has("search_console")) {
    const data = await getSearchConsoleSites();
    sections.push(`Google Search Console Sites:\n${JSON.stringify(data, null, 2)}`);
  }
  if (activeSources.has("google_ads")) {
    const data = await getGoogleAdsAccounts();
    sections.push(`Google Ads Accounts:\n${JSON.stringify(data, null, 2)}`);
  }
  if (activeSources.has("meta_ads")) {
    const data = await getMetaAdsAccounts();
    sections.push(`Meta Ads Accounts:\n${JSON.stringify(data, null, 2)}`);
  }
  if (activeSources.has("gohighlevel")) {
    const data = await getGoHighLevelLocations();
    sections.push(`GoHighLevel Locations:\n${JSON.stringify(data, null, 2)}`);
  }
  if (activeSources.has("tracker")) {
    const data = await getTrackerDashboard(1, businessName, 10);
    sections.push(`Rank Tracker Data:\n${JSON.stringify(data, null, 2)}`);
  }
  if (activeSources.has("checkins")) {
    const data = await getCheckinDashboard(1, businessName, 10);
    sections.push(`Check-In Data:\n${JSON.stringify(data, null, 2)}`);
  }

  const clickUpTeams = await getClickUpTeams();
  sections.push(`ClickUp Teams:\n${JSON.stringify(clickUpTeams, null, 2)}`);

  const prompt = `
    Generate a 30-day Business Monthly Touch for "${businessName}".

    This client's active services (per ClickUp Client Health Tracker) are: ${
      activeServices.length ? activeServices.join(", ") : "none found"
    }.
    Only the data sources relevant to their active services are included below.

    ${sections.join("\n\n")}
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  });
  return response.text;
};
