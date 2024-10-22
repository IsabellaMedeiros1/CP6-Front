"use client";

import { useRouter } from "next/navigation";
import { integrantes } from "@/types";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleCardClick = (nome: string) => {
    router.push(`/integrantes/${nome.toLowerCase()}`);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-10">Portfólio de Avaliações</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {integrantes.map((integrante) => (
          <div
            key={integrante.id}
            className="cursor-pointer bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform"
            onClick={() => handleCardClick(integrante.nome)}
          >
            <Image
              src={`/img/${integrante.nome.toLowerCase()}.jpeg`}
              alt={`Foto de ${integrante.nome}`}
              width={150}
              height={150}
              className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
              priority // Garantir carregamento rápido
            />
            <h2 className="text-2xl font-semibold text-center">{integrante.nome}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}
