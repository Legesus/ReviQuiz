import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz App",
  description:
    "A dynamic quiz application where users can upload JSON files to generate quizzes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Applying the Inter font class and antialiased for smoother fonts */}
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
