import React from "react";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter as BodyFont, Sora as HeadingFont } from "next/font/google";

import "../styles/globals.css";
import { _siteConfig } from "@/config/site";
import CustomProvider from "@/api/reduxProvider";
import { AuthInitializer } from "./providers";
import { ThemeProvider } from "@/context/theme/theme-provider";

const inter = BodyFont({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const heading = HeadingFont({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: _siteConfig.name,
  description: _siteConfig.desc,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${heading.variable} antialiased`}
    >
      <body className={`${inter.className} antialiased`}>
        <CustomProvider>
          <AuthInitializer>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </AuthInitializer>
        </CustomProvider>
        <Toaster />
      </body>
    </html>
  );
}
