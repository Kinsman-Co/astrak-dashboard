// src/config/astrak.ts

export type ViewMode = "weekly" | "monthly";
export type TabKey = "channels" | "funnel" | "seo" | "creative";

export type ReportMap = Record<ViewMode, string>;               // weekly/monthly URL
export type BrandTabReports = Record<TabKey, ReportMap>;       // tabs -> weekly/monthly
export type Insight = { metric: string; change: string; why: string; next: string };

export type BrandConfig = {
  id: string;              // slug, e.g. "brand-a"
  name: string;            // display name, e.g. "Brand A"
  reports: BrandTabReports;
  insights?: Record<ViewMode, Insight[]>; // optional manual notes; AI will live in Looker
};

export type OverviewConfig = {
  name: string; // "Astrak Group Overview"
  kpiReports: ReportMap; // weekly/monthly group roll-up embed
};

export type AstrakConfig = {
  overview: OverviewConfig;
  brands: BrandConfig[];
  email: {
    weeklyTime: "Sun 08:00";     // brief requirement
    monthlyTime: "1st 09:00";
    recipients: string[];        // who gets summaries
  };
};

// --- START: FILL THESE WITH YOUR REAL EMBED LINKS ---
// Example: Replace with your Looker Studio Pro embed URLs for the group overview
const OVERVIEW_WEEKLY = "https://lookerstudio.google.com/embed/reporting/REPLACE_GROUP_WEEKLY";
const OVERVIEW_MONTHLY = "https://lookerstudio.google.com/embed/reporting/REPLACE_GROUP_MONTHLY";

// For each brand, provide a weekly & monthly URL per tab.
// Use placeholders now and we’ll paste real links later.
const PLACEHOLDER = "https://lookerstudio.google.com/embed/reporting/REPLACE_ME";

// Example brand IDs/names — change to your actual eight brands
const BRAND_LIST: Array<{ id: string; name: string }> = [
  { id: "brand-a", name: "Brand A" },
  { id: "brand-b", name: "Brand B" },
  { id: "brand-c", name: "Brand C" },
  { id: "brand-d", name: "Brand D" },
  { id: "brand-e", name: "Brand E" },
  { id: "brand-f", name: "Brand F" },
  { id: "brand-g", name: "Brand G" },
  { id: "brand-h", name: "Brand H" },
];

// Helper to make empty tab set you can edit later
function emptyBrandTabs(): BrandTabReports {
  return {
    channels: { weekly: PLACEHOLDER, monthly: PLACEHOLDER },
    funnel:   { weekly: PLACEHOLDER, monthly: PLACEHOLDER },
    seo:      { weekly: PLACEHOLDER, monthly: PLACEHOLDER },
    creative: { weekly: PLACEHOLDER, monthly: PLACEHOLDER },
  };
}

export const astrakConfig: AstrakConfig = {
  overview: {
    name: "Astrak Group Overview",
    kpiReports: {
      weekly: OVERVIEW_WEEKLY,
      monthly: OVERVIEW_MONTHLY,
    },
  },
  brands: BRAND_LIST.map(({ id, name }) => ({
    id,
    name,
    reports: emptyBrandTabs(),
    insights: {
      weekly: [
        // Example card structure; optional manual notes:
        // { metric: "ROAS", change: "-12%", why: "Meta CPC up 18%", next: "Shift £2k to PMax; pause low CTR ads" },
      ],
      monthly: [],
    },
  })),
  email: {
    weeklyTime: "Sun 08:00",
    monthlyTime: "1st 09:00",
    recipients: ["reports@kinsman.co"], // add real recipients later
  },
};




