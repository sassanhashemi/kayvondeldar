import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kayvon Deldar — Official Website",
  description: "Golabi. Analyst. Schedule Dictator. The official roast website of Kayvon Deldar.",
  metadataBase: new URL("https://kayvondeldar.com"),
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Kayvon Deldar — Official Website",
    description: "Golabi. Analyst. Schedule Dictator. The official roast website of Kayvon Deldar.",
    url: "https://kayvondeldar.com",
    siteName: "kayvondeldar.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kayvon Deldar — Golabi. Analyst. Schedule Dictator.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kayvon Deldar — Official Website",
    description: "Golabi. Analyst. Schedule Dictator. The official roast website of Kayvon Deldar.",
    images: ["/og-image.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
