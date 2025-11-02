import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
