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
  title: "C7Dev_ | Cristian Morales — Desarrollador Web & Ing. de Sistemas",
  description: "Portafolio profesional de Cristian Morales (C7Dev_). Desarrollador Web Full Stack, Ingeniero de Sistemas y creador de contenido en Colombia. Especializado en Next.js, React, Python y Java. Servicios de desarrollo web, animaciones y automatización.",
  keywords: [
    "desarrollador web Colombia",
    "programador freelance Colombia",
    "C7Dev",
    "ingeniero de sistemas",
    "Next.js developer",
    "React developer Colombia",
    "desarrollo web profesional",
    "cristian morales desarrollador",
    "portafolio programador",
    "creador contenido tech"
  ],
  authors: [{ name: "Cristian Morales", url: "https://c7dev.vercel.app" }],
  creator: "Cristian Morales — C7Dev_",
  metadataBase: new URL("https://c7dev.vercel.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://c7dev.vercel.app",
    siteName: "C7Dev_ Portafolio",
    title: "C7Dev_ | Cristian Morales — Desarrollador Web",
    description: "Portafolio profesional de C7Dev_. Soluciones digitales modernas: sitios web, apps, automatización y más.",
    images: [
      {
        url: "/images/profile.png",
        width: 1200,
        height: 630,
        alt: "C7Dev_ — Cristian Morales Desarrollador Web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "C7Dev_ | Cristian Morales — Desarrollador Web",
    description: "Portafolio profesional. Desarrollo web, Python, Java y más.",
    images: ["/images/profile.png"],
    creator: "@c7dev_",
  },
  verification: {
    google: "",
  },
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