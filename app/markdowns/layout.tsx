import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ".././globals.css";
import { Container } from "@/components/ui/Container";
import MarkdownsNavbar from "./components/MarkdownsNavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Acme Co.: Building Solutions, Shaping Futures",
  description: "Acme Co's Marketing Department Website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Container>
          <MarkdownsNavbar />
          {children}
        </Container>
      </body>
    </html>
  );
}
