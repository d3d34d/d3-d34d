import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HackerBackground } from "@/components/HackerBackground";
import { siteConfig } from "@/content/site.config";
import { AppInitializer } from "@/components/AppInitializer";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: siteConfig.siteTitle,
  description: siteConfig.siteDescription,
  icons: {
    icon: "/seo/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-mono">
        <AppInitializer>
          <HackerBackground />
          {/* Header is shared across ALL pages — edit: src/content/site.config.ts */}
          <Header />

          {/* Page content injected here */}
          <div className="flex-1">
            {children}
          </div>

          {/* Footer is shared across ALL pages — edit: src/content/site.config.ts */}
          <Footer />
        </AppInitializer>
      </body>
    </html>
  );
}
