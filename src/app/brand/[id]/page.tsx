// Server Component
import BrandClient from "./BrandClient";

export default async function BrandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Next.js 16: params is a Promise
  return <BrandClient id={id} />;
}
