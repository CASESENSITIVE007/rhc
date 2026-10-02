import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import IntroSplash from "./components/IntroSplash";
import { INTRO_SEEN_KEY } from "./components/intro";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RHC",
  description: "RHC",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Hide the intro before first paint if it was already watched this session */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("${INTRO_SEEN_KEY}")==="1")document.documentElement.dataset.introSeen=""}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <IntroSplash />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
