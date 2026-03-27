import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sileo";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://kommit.vercel.app";

const siteDescription =
  "Kommit is a project management tool that helps teams stay organized and on track.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Kommit",
    template: "%s | Kommit",
  },

  description: "Kommit is a project management tool that helps teams stay organized and on track.",

  keywords: [
    "Kommit",
    "Kommit app",
    "project management tool",
    "task management",
    "React developer",
    "web developer portfolio",
    "TypeScript developer",
    "Laravel developer",
  ],

  authors: [
    { name: "Heaven Dave Ancheta", url: "https://github.com/daveancheta" },
  ],

  creator: "Heaven Dave Ancheta",
  publisher: "Heaven Dave Ancheta",

  verification: {
    google: "google40871603dc33eb2c",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Kommit",
    title: "Kommit",
    description: "Kommit is a project management tool that helps teams stay organized and on track.",
    images: [
      {
        url: `/kommit.jpg`,
        width: 1200,
        height: 630,
        alt: "Kommit",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Kommit",
    description: "Kommit is a project management tool that helps teams stay organized and on track.",
    images: [`/kommit.jpg`],
  },

  alternates: {
    canonical: siteUrl,
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="z-9999999999">
            <Toaster position="top-center"/>
          </div>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
