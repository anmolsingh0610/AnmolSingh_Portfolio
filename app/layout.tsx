import type { Metadata } from "next";
import { Inter, DM_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import BackgroundScene from "@/components/canvas/BackgroundScene";
import CustomCursor from "@/components/ui/CustomCursor";
import MotionProvider from "@/components/ui/MotionProvider";
import TelemetryHUD from "@/components/ui/TelemetryHUD";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anmol Singh Portfolio",
  description: "A fluid, weightless interactive developer portfolio.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <CustomCursor />
        <TelemetryHUD />
        <BackgroundScene />
        <SmoothScroll>
          <MotionProvider>
            {children}
            {modal}
          </MotionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
