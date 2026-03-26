import type { Metadata } from "next";
import { Playfair_Display, Roboto_Slab, Lora } from "next/font/google";
import "./globals.css";
import CursorOrb from "@/components/ui/CursorOrb";

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
});

const robotoslab = Roboto_Slab({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
});

const lora = Lora({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "MeetMind — AI Meeting Intelligence",
  description:
    "Transform any meeting into structured intelligence using Claude AI. Upload audio, images, or paste a transcript.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${robotoslab.variable} ${lora.variable}`}
      >
        <CursorOrb />
        {children}
      </body>
    </html>
  );
}
