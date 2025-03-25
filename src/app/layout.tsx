import { TooltipProvider } from "@radix-ui/react-tooltip";
import type { Metadata } from "next";
import { Funnel_Sans } from "next/font/google";
// import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { inter, notoSansMono } from "@/fonts";
import "./globals.css";

const funnel = Funnel_Sans({
  subsets: ["latin"],
  variable: "--font-funnel-sans",
});

export const metadata: Metadata = {
  title: "MH: Wilds Set Builder & Damage Calculator",
  description: "A set builder and damage calculator for Monster Hunter: Wilds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TooltipProvider delayDuration={100}>
        <body
          className={`bg-background text-white ${inter.variable} ${notoSansMono.variable} ${funnel.variable} antialiased`}
        >
          <Header />
          <main className="max-w-11xl mx-auto pt-2 pb-12 sm:px-2">
            {children}
          </main>
          {/* <Footer /> */}
        </body>
      </TooltipProvider>
    </html>
  );
}
