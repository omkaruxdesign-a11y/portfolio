import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Omkar's Portfolio",
  description: "Bringing all of my works under a single place. You will find my Product design, freelancing, concept, side-projects and many more here!",
  openGraph: {
    title: "Omkar's Portfolio",
    description: "Bringing all of my works under a single place. You will find my Product design, freelancing, concept, side-projects and many more here!",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Omkar - Product Designer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omkar's Portfolio",
    description: "Bringing all of my works under a single place. You will find my Product design, freelancing, concept, side-projects and many more here!",
    images: ["/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
