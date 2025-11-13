// app/config/astrak.ts
type ViewMode = "weekly" | "monthly";

export const astrakConfig = {
  overview: {
    name: "Astrak Overview",
    kpiReports: {
      weekly: process.env.NEXT_PUBLIC_LS_OVERVIEW_WEEKLY_URL || "",
      monthly: process.env.NEXT_PUBLIC_LS_OVERVIEW_MONTHLY_URL || "",
    } as Record<ViewMode, string>,
  },
  brands: [
    { id: "astrak", name: "Astrak" },
    // add more brands here...
  ],
};
export type TabKey = "channels" | "funnel" | "seo" | "creative";
export type ViewKey = "weekly" | "monthly";
