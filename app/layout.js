import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Bikin Twibbon Jalur Cepat",
  description: "Created by @saulandreee",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased bg-slate-800 text-slate-50", fontSans.variable)}>
        <div className="py-20 max-w-[1200px] mx-auto">{children}</div>
      </body>
    </html>
  );
}
