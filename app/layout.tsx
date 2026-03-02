import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Martian_Mono,
  Bitcount_Prop_Single,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "martian_weather",
  description: "what's the weather like on mars?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${martianMono.variable}  antialiased`}>{children}</body>
    </html>
  );
}
