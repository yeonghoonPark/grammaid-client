import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

import ReactQueryProvider from "@/providers/ReactQueryProvider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grammaid",
  description: "An app to improve your English through reviews and quizzes.",
};

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Readonly<Props>) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <ReactQueryProvider>
          <div className="relative flex flex-col min-h-screen max-w-3xl mx-auto">
            {/* Header */}
            <header className="shrink-0 py-4 border-b">
              <h1 className="text-3xl font-bold">
                <Link href="/">Grammaid</Link>
              </h1>
            </header>

            {/* Main */}
            <main className="flex-1 py-8">{children}</main>

            {/* Footer */}
            <footer className="hidden">Footer</footer>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
