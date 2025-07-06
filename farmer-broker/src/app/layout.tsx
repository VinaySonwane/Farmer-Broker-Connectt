import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Providers from "@/store/Providers";
//import ReduxHydrator from "@/store/ReduxHydrator";

//src/app/layout.tsx or src/app/layout.jsx
//

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "farmer Broker App",
  description: "Digitizing the vegetable market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {/* <ReduxHydrator /> */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
