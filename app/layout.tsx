import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Kem0n0Neco",
  description: "Personal landing page — fursuiter, developer, gamer.",
  openGraph: {
    title: "Kem0n0Neco",
    description: "Personal landing page — fursuiter, developer, gamer.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kem0n0Neco",
    description: "Personal landing page — fursuiter, developer, gamer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="min-h-dvh flex flex-col">{children}</body>
    </html>
  );
}
