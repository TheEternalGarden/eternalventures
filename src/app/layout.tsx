import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

const helios = localFont({
  src: '../../public/fonts/HeliosExt.otf',
  variable: '--font-helios',
});

export const metadata: Metadata = {
  title: "Eternal Ventures",
  description: "Eternal Ventures - Ventures, Labs, Garden, Music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${helios.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
