import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Source_Serif_4, Titillium_Web } from "next/font/google";
import localFont from "next/font/local";
import Loader from "@/components/Loader";
import { SoundProvider } from "@/components/sound";
import ThemeToggle from "@/components/ThemeToggle";
import { site } from "@/data/site";
import "./globals.css";

const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

const title = Titillium_Web({ variable: "--font-title", subsets: ["latin"], weight: "300", display: "swap" });

const serif = Source_Serif_4({ variable: "--font-serif", subsets: ["latin"], weight: "400", display: "swap", preload: false });

/**
 * Alexandria Bold (OFL), subset to the four section subtitles.
 * Chosen over Noto Kufi, whose final ے swallows the dot of a preceding ب (منصوبے).
 * If you change the Urdu words in data/site.ts, regenerate the subset (see README)
 * or swap this for `Alexandria` from next/font/google.
 */
const urdu = localFont({ src: "./fonts/urdu-subset.woff2", variable: "--font-urdu", weight: "700", display: "swap" });

const pageTitle = `${site.name}, ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: pageTitle, template: `%s · ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  keywords: [...site.tags, ...site.ticker],
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: site.name, title: pageTitle, description: site.description, locale: "en_US" },
  twitter: { card: "summary_large_image", title: pageTitle, description: site.description, creator: site.contact.x.label },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e0e13" },
    { media: "(prefers-color-scheme: light)", color: "#e3e3ea" },
  ],
};

/** Runs before paint: dark unless the visitor picked light. */
const THEME_SCRIPT = `try{var t=localStorage.getItem('mz-theme');document.documentElement.classList.toggle('dark',t!=='light')}catch(e){document.documentElement.classList.add('dark')}document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`dark ${mono.variable} ${title.variable} ${serif.variable} ${urdu.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-dvh">
        <a href="#main" className="btn btn-solid sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[110]">
          Skip to content
        </a>
        <Loader />
        <SoundProvider>
          <ThemeToggle />
          {children}
        </SoundProvider>
      </body>
    </html>
  );
}
