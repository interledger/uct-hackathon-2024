import "$/src/styles/globals.css";

import { type Metadata } from "next";
import { siteConfig, type SiteConfig } from "$/src/config/site";
import { fontSans } from "$/src/config/fonts";
import clsx from "clsx";

import { Providers } from "./providers";
import { Navbar } from "$/src/app/_components/Navbar/navbar";
import { Footer } from "./_components/Footer/footer";

const config: SiteConfig = siteConfig;

export const metadata: Metadata = {
  title: {
    default: config.name,
    template: `%s - ${config.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers
          themeProps={{ children, attribute: "class", defaultTheme: "dark" }}
        >
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
