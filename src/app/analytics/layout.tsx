import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaign Analytics & Insights | AdSpace Command Center",
  description: "Track real-time billboard impressions, verified footfall traffic, and campaign ROI. Get AI-powered insights to optimize your OOH advertising budget.",
  alternates: {
    canonical: "https://adspace.in/analytics",
  },
};

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
