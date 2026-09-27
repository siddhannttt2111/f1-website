import type { Metadata } from "next";
import { Barlow_Condensed, Geist } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SLIPSTREAM — The Story of Formula 1",
  description:
    "A scroll-driven journey through Formula 1: the Red Bull RB19 up close, the Red Bull vs McLaren rivalry, and the cars that defined each era.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${barlow.variable} antialiased`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
