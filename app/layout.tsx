import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Omkar Mangalekar - Product Designer",
  description: "Product Designer with 2 years of experigence. I love things that add value to lives. Currently at SocialSonar, previously at Hyperly and VestorGrow.",

  // Open Graph (for LinkedIn, Facebook, WhatsApp, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Omkar Mangalekar - Product Designer",
    description: "Product Designer with 2 years of experience. I love things that add value to lives.",
    siteName: "Omkar Mangalekar Portfolio",
    images: [
      {
        url: "/preview/preview.png",
        width: 1200,
        height: 630,
        alt: "Omkar Mangalekar - Product Designer Portfolio",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Omkar Mangalekar - Product Designer",
    description: "Product Designer with 2 years of experience. I love things that add value to lives.",
    images: ["/preview/preview.png"],
  },

  // Additional SEO metadata
  keywords: ["Product Designer", "UX Designer", "UI Designer", "Portfolio", "Omkar Mangalekar", "SocialSonar", "Hyperly", "VestorGrow"],
  authors: [{ name: "Omkar Mangalekar" }],
  creator: "Omkar Mangalekar",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        <main className="border border-[#2a2a2a] min-h-screen bg-black max-w-[700px] mx-auto">
          <Nav />
          {children}
        </main>
        {modal}
      </body>
    </html>
  );
}
