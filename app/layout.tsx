import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SecretGate from "@/components/SecretGate";
import CustomCursor from "@/components/CustomCursor";
import StartupAnimation from "@/components/StartupAnimation";
import BackgroundMusic from "@/components/BackgroundMusic";
import { ConfigProvider } from "@/context/ConfigContext";
import { MusicProvider } from "@/context/MusicContext";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "C7Dev_ | Ing. De Sistemas",
  description: "Desarrollador Web & Creador de contenido",
};

import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-sans antialiased scanlines flex flex-col min-h-screen bg-cyber-black text-white">
        <ConfigProvider>
          <MusicProvider>
            <StartupAnimation />
            <CustomCursor />
            <SecretGate />
            <Navbar />
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
            <BackgroundMusic />
            <SpeedInsights />
          </MusicProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}