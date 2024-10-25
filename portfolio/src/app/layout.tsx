// app/layout.tsx
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { integrantes } from "@/types"; // Certifique-se de que esta importação está correta
import type { Metadata } from "next";

// Metadados da página
export const metadata: Metadata = {
  title: "Portfólio",
  description: "Generated by create next app",
};

// Componente RootLayout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Define o tipo das children como React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Header integrantes={integrantes} /> {/* Passa os integrantes para o Header */}
        {children} {/* Renderiza os filhos da página */}
        <Footer /> {/* Coloca o Footer dentro do body */}
      </body>
    </html>
  );
}
