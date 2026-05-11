import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transparent Pricing | No Hidden Fees | AdSpace",
  description:
    "Simple, honest pricing for every budget. Pay per campaign, no subscriptions, no hidden broker fees. See all AdSpace plans and what's included.",
  alternates: { canonical: "https://adspace.in/pricing" },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
