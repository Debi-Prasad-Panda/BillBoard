import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBillboardById, BILLBOARDS } from "../data";
import BillboardDetailClient from "./BillboardDetailClient";

export async function generateStaticParams() {
  return BILLBOARDS.map(b => ({ id: b.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const bb = getBillboardById(id);
  if (!bb) return { title: "Not Found" };
  return {
    title: `${bb.title} | AdSpace Analytics`,
    description: `${bb.size} ${bb.type} billboard at ${bb.location}. ₹${bb.price}/day · ~${bb.impressions.toLocaleString()} daily impressions. View traffic, campaign performance, and ROI analytics.`,
  };
}

export default async function BillboardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bb = getBillboardById(id);
  if (!bb) notFound();
  return <BillboardDetailClient billboard={bb} allBillboards={BILLBOARDS} />;
}
