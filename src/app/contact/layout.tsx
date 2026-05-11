import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Get Help & Support | AdSpace",
  description:
    "Have questions about AdSpace? Reach out to our team for sales inquiries, support, or partnership opportunities. We respond within 24 hours.",
  alternates: { canonical: "https://adspace.in/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
