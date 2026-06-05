import type { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/site-config";
import { themeInitScript } from "@/lib/theme";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Navbar } from "@/components/landing/Navbar";
import { SiteFooter } from "@/components/landing/SiteFooter";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
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
  themeColor: "#f5f6f7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-theme="light" suppressHydrationWarning>
      <body
        className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} min-h-dvh font-sans antialiased text-foreground bg-background`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider />
        <Navbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
