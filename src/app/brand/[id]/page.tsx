// src/app/brand/[id]/page.tsx
import BrandClient from "./BrandClient";

export default async function BrandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <BrandClient id={id} />;
}
