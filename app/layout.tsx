import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import DecorativeComponents from "@/components/ui/DecorativeComponents";

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
  metadataBase: new URL("https://schedulr.co.uk"),
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
    url: "https://schedulr.co.uk",
    images: [
      {
        url: "/images/schedulr-logo.png",
        width: 512,
        height: 512,
        alt: "Schedulr Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Schedulr - Group Scheduling Made Simple",
    description: "Coordinate schedules with friends and teams. AI-powered availability finding.",
    images: ["/images/schedulr-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: "#4F46E5",
  manifest: "/manifest.json",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/images/schedulr-logo.png',
  },
  alternates: {
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://apps.apple.com" />
        <link rel="preconnect" href="https://vercel-insights.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Schedulr",
                description: "Group scheduling app for coordinating calendars with friends and teams",
                url: "https://schedulr.co.uk",
                logo: "https://schedulr.co.uk/images/schedulr-logo.png",
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Schedulr",
                url: "https://schedulr.co.uk",
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: "https://schedulr.co.uk/search?q={search_term_string}",
                  },
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "MobileApplication",
                name: "Schedulr",
                operatingSystem: "iOS",
                applicationCategory: "ProductivityApplication",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "GBP",
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.5",
                  ratingCount: "1",
                },
                downloadUrl: "https://apps.apple.com/gb/app/schedulr/id6754965988",
                url: "https://schedulr.co.uk",
              },
            ]),
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <DecorativeComponents />
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
