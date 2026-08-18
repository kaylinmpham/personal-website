import "./globals.css";
import "@fontsource/cedarville-cursive";
import "@fontsource/geist-mono/400.css";
import "@fontsource/geist-mono/500.css";
import type { Metadata } from "next";
import { Syne, Chivo_Mono } from "next/font/google";
import Nav from "@/components/layout/Nav";
import FluidCursor from "@/components/ui/FluidCursor";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const chivoMono = Chivo_Mono({
  variable: "--font-chivo-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Kaylin Pham — Design Engineer",
  description:
    "Design engineer crafting thoughtful, animated interfaces. Front-end focused with a passion for motion, typography, and the space between design and code.",
  icons: {
    icon: "/icon.svg",
  },
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-flash: apply stored theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('cyano-theme');if(t)document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
      </head>
      <body className={`${syne.variable} ${chivoMono.variable} antialiased`}>
        <ThemeProvider>
          <div className="grain-overlay" aria-hidden="true" />
          <FluidCursor />
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
