"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Navbar from "./_components/_Navbar/Navbar";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import AppInitializer from "./_components/_chekToken/AppInitializer";
import { store } from "@/redex/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppRouterCacheProvider>
          <Provider store={store}>
            <Navbar />
            {children}
            <AppInitializer />
            <Toaster />
          </Provider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
