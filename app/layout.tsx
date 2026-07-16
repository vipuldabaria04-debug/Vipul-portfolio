import type { Metadata } from "next";
import { Instrument_Sans, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CursorGlow } from "@/components/layout/CursorGlow";
import { BackToTop } from "@/components/ui/BackToTop";
import { site } from "@/data/site";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Vipul Dabaria",
    "Electrical Engineering",
    "Embedded Systems",
    "Power Systems",
    "Physics-Informed Neural Networks",
    "Smart Infrastructure",
    "IIT Kharagpur",
    "RTU Kota",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: `https://${site.domain}`,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="relative min-h-screen bg-ink-950">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-signal focus:px-4 focus:py-2 focus:text-white focus:font-medium"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <CursorGlow />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
