// app/brand/[id]/page.tsx  (Server Component)
import BrandClient from "./BrandClient";
import Insights from "@/app/components/Insights"; // ⬅️ add this import

export default async function BrandPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ tab?: string; mode?: string }>;
}) {
  // Next.js 16: params/searchParams are Promises
  const { id } = await params;
  const sp = (await searchParams) ?? {};

  // Read current view
  const tab = (sp.tab ?? "channels") as "channels" | "funnel" | "seo" | "creative";
  const mode = (sp.mode ?? "monthly") as "weekly" | "monthly";

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 pb-16">
      <BrandClient id={id} />

      {/* Show insight cards only on Channels + Monthly */}
      {tab === "channels" && mode === "monthly" && (
        <div className="mt-8">
          <Insights brand={id} view="monthly" title={`${id} — Monthly Insights`} />
        </div>
      )}
    </div>
  );
}
