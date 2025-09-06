import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";
import { ModalContainer } from "@/components/modals/ModalContainer";
import { WaitlistProvider } from "@/context/WaitlistContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AICHEMIST - Guided AI Prompting",
  description: "Guided AI prompting crafted for clarity, speed, and consistency",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&family=Lora&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/logobrowser.ico" />

      </head>
      <body
        className=''
      >
        <WaitlistProvider>
     <LayoutWrapper>{children}</LayoutWrapper>
      <ModalContainer/>
      </WaitlistProvider>
      </body>
    </html>
  );
}
