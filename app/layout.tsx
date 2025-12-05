import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Schedulr - Group Scheduling Made Simple",
  description: "Coordinate schedules with friends and teams. AI-powered availability finding. Beautiful design.",
  keywords: ["group scheduling", "calendar app", "team coordination", "meeting scheduler", "availability finder"],
  authors: [{ name: "Schedulr" }],
  openGraph: {
    title: "Schedulr - Group Scheduling Made Simple",
    description: "Coordinate schedules with friends and teams. AI-powered availability finding. Beautiful design.",
    type: "website",
    locale: "en_US",
    siteName: "Schedulr",
  },
  twitter: {
    card: "summary_large_image",
    title: "Schedulr - Group Scheduling Made Simple",
    description: "Coordinate schedules with friends and teams. AI-powered availability finding.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Schedulr",
              description: "Group scheduling app for coordinating calendars with friends and teams",
              url: "https://schedulr.co.uk",
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        {/* 
        <div
          className="sticky top-0 z-50 w-full bg-amber-100 border-b border-amber-200 text-amber-900 text-center px-4 py-3 text-sm"
          role="alert"
        >
          <span className="font-semibold">Authentication notice:</span>{" "}
          Supabase is experiencing an outage affecting login. You may be signed out and unable to log in until service is restored.
        </div>
        */}
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
