import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import MarkdownsNavbar from "./components/MarkdownsNavbar";
import Footer from "./components/Footer";

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
    <Container className="flex flex-col justify-between min-h-screen pb-4">
      <div>
        <MarkdownsNavbar />
        {children}
      </div>
      <Footer />
    </Container>
  );
}
