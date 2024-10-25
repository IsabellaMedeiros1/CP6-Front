// app/layout.tsx
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { integrantes } from "@/types"; 
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
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Header integrantes={integrantes} /> 
        {children} 
        <Footer /> 
      </body>
    </html>
  );
}
