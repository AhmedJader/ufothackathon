import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  ClerkLoaded,
  ClerkLoading,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import Navbar from "../components/Navbar";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for the app
export const metadata: Metadata = {
  title: "MyBank",
  description: "Type stuff ya hearrrr",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Server-side authentication
  const { userId } = await auth();

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo.webp" type="image/webp" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* Loading state for Clerk */}
          <ClerkLoading>
            <div className="flex items-center justify-center h-screen text-2xl">
              Loading...
            </div>
          </ClerkLoading>
          {/* Loaded state for Clerk */}
          <ClerkLoaded>
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col h-screen">
                {/* Pass userId to Navbar */}
                <Navbar userId={userId} />
                {children}
              </div>
            </div>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
