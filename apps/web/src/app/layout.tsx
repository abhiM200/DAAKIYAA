import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "../store/StoreProvider";
import Sidebar from "../components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daaakiya - India Super App",
  description: "Social, Messaging, Matches, Stories, Reels, Jobs & Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-neutral-950 text-white min-h-full flex antialiased">
        <StoreProvider>
          <Sidebar />
          <div className="flex-1 pl-16 md:pl-64 w-full">
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
