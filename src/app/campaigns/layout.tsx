import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaign Manager | Track & Optimize Your OOH Campaigns | AdSpace",
  description:
    "Monitor all your active, upcoming, and completed billboard campaigns in one place. Track impressions, spending, and performance in real-time.",
  alternates: { canonical: "https://adspace.in/campaigns" },
};

export default function CampaignsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
