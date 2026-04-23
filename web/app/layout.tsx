import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/site-config";
import { Navbar } from "@/components/landing/Navbar";
import { SiteFooter } from "@/components/landing/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Paladio.ai – AI Agents for real business workflows",
    template: "%s | Paladio.ai",
  },
  description:
    "Productized, verifiable AI agents that turn messy inputs into structured, reviewable outputs—built for real workflows.",
  applicationName: "Paladio.ai",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Paladio.ai",
    title: "Paladio.ai – AI Agents",
    description:
      "Productized, verifiable AI agents for commerce and AEC workflows.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paladio.ai – AI Agents",
    description:
      "Productized, verifiable AI agents for real business workflows.",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#fafbfc",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} min-h-dvh font-sans antialiased text-foreground bg-background`}
      >
        <Navbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
