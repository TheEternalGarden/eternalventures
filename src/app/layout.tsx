import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const heliosExt = localFont({
  src: '../../public/fonts/HeliosExt.otf',
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
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src 'self' blob: data: *; img-src 'self' data:; font-src 'self' data:; connect-src *;"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
