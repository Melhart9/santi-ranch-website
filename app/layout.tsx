import type { Metadata } from "next";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dos Arroyos — Agricultura Sustentable",
  description: "Un rancho diversificado dedicado a la agricultura sustentable, ganadería de calidad y productos artesanales del campo. Puebla, México.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-cream">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
