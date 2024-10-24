"use client";

import { useRouter } from "next/navigation";
import { integrantes } from "@/types";
import Image from "next/image";
import "@/styles/cards.css";

export default function Home() {
  const router = useRouter();

  const handleCardClick = (nome: string) => {
    router.push(`/cards/${nome.toLowerCase()}`);
  };

  return (
    <main className="main">
      <h1 className="title">Portfólio de Avaliações</h1>

      <div className="cards-container">
        <div className="card-row">
          {integrantes.slice(0, 3).map((integrante) => (
            <div
              key={integrante.id}
              className="card"
              onClick={() => handleCardClick(integrante.nome)}
            >
              <div className="flex justify-center mb-4"> 
                <Image
                  src={`/img/${integrante.nome.toLowerCase()}.jpeg`}
                  alt={`Foto de ${integrante.nome}`}
                  width={120} 
                  height={120} 
                  className="rounded-full"
                />
              </div>
              <h2>{integrante.nome}</h2>
            </div>
          ))}
        </div>

        <div className="card-row">
          {integrantes.slice(3, 5).map((integrante) => (
            <div
              key={integrante.id}
              className="card"
              onClick={() => handleCardClick(integrante.nome)}
            >
              <div className="flex justify-center mb-4"> 
                <Image
                  src={`/img/${integrante.nome.toLowerCase()}.jpeg`}
                  alt={`Foto de ${integrante.nome}`}
                  width={120} 
                  height={120} 
                  className="rounded-full"
                />
              </div>
              <h2>{integrante.nome}</h2>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}