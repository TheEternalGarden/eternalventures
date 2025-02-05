import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const heliosExt = localFont({
  src: './fonts/HeliosExt.otf',
  variable: '--font-helios-ext',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: "Eternal Ventures",
  description: "Eternal Ventures Landing Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${heliosExt.variable} ${inter.className}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
