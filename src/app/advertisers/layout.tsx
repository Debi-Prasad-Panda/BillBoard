import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Advertisers | Run High-Impact OOH Campaigns | AdSpace",
  description:
    "Launch outdoor advertising campaigns across 120+ Indian cities. GPS-verified impressions, real-time analytics, and transparent pricing — no middlemen.",
  alternates: { canonical: "https://adspace.in/advertisers" },
};

export default function AdvertisersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
