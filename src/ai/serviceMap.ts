// Maps ClickUp "⭐ Services" labels (Client Health Tracker list) to the
// internal data sources that should be pulled when a client has that
// service active. Labels with no mapped source are intentionally left out
// below (SMM, Web Design, WEB Maintenance, Web Hosting) since there is no
// corresponding integration yet.
export const SERVICE_TO_SOURCE: Record<string, string[]> = {
  "Map Pack Dominator": ["tracker"],
  "Map Ranking Booster": ["tracker"],
  "Top Booster (1 Kw cluster)": ["tracker"],
  "CTR Booster": ["tracker"],
  "Rank Tracker": ["tracker"],
  "Map Check-Ins": ["checkins"],
  "GBP Maintenance": ["gmb"],
  "GBP +": ["gmb"],
  "One-Time GBP Optimization": ["gmb"],
  "Google Ads": ["google_ads"],
  "Meta Ads": ["meta_ads"],
  LSA: ["google_ads"],
  "SEO+AI": ["search_console", "ga4"],
  "Custom SEO": ["search_console", "ga4"],
  CRM: ["gohighlevel"],
  "Map Sense & Local Growth Engine": ["tracker", "checkins"],
};
