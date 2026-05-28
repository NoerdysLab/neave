import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tryneave.com"),
  title: "Neave · Organic cotton pillowcases, shipped without plastic",
  description:
    "Neave makes GOTS-certified organic cotton pillowcases, shipped without plastic. Join the waitlist for early access and 20% off at launch.",
  openGraph: {
    title: "Neave · Organic cotton pillowcases, shipped without plastic",
    description:
      "GOTS-certified organic cotton pillowcases, shipped without plastic. Join the waitlist for early access and 20% off at launch.",
    url: "https://tryneave.com",
    siteName: "Neave",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neave · Organic cotton pillowcases",
    description:
      "GOTS-certified organic cotton pillowcases, shipped without plastic. Join the waitlist.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
