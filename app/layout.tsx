import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/components/layout/providers";

export const metadata: Metadata = {
  title: "ResumeRank | Resume Screening Dashboard",
  description:
    "HR candidate ranking system with resume parsing, scoring, and analytics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
