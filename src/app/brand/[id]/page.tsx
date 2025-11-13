// app/brand/[id]/page.tsx
import BrandClient from "./BrandClient";

export default function BrandPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return <BrandClient id={id} />;
}
