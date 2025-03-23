import { TooltipProvider } from "@radix-ui/react-tooltip";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { inter, notoSansMono } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "MH: Wilds Damage Calculator",
  description: "A damage calculator for Monster Hunter: Wilds.",
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
          className={`bg-background text-white ${inter.variable} ${notoSansMono.variable} antialiased`}
        >
          <Header />
          <main className="max-w-11xl mx-auto p-2">{children}</main>
        </body>
      </TooltipProvider>
    </html>
  );
}
