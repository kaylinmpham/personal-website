import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import FluidCursor from "@/components/ui/FluidCursor";
import { Analytics } from "@vercel/analytics/next";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Kaylin Pham — Design Engineer",
  description:
    "Design engineer crafting thoughtful, animated interfaces. Front-end focused with a passion for motion, typography, and the space between design and code.",
  openGraph: {
    title: "Kaylin Pham — Design Engineer",
    description:
      "Front-end engineer with a design eye — crafting fluid, accessible interfaces.",
    type: "website",
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
        className={`${syne.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        {/* Grain texture overlay for tactile depth */}
        <div className="grain-overlay" aria-hidden="true" />
        <FluidCursor />
        <Nav />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
