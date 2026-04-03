import type { Metadata } from "next";
import { Averia_Serif_Libre, Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/dom/AppShell";

const averia = Averia_Serif_Libre({
  variable: "--font-averia",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KILN",
  description:
    "KILN is a studio and digital museum for objects, systems, essays, and tools archived for long-term use.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${averia.variable} ${inter.variable}`}>
      <body className="bg-[#13161F] text-white antialiased overflow-x-hidden">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
