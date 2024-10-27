"use client";

import Link from "next/link"; 
import { useEffect } from "react";
import { integrantes } from "@/types";
import Image from "next/image";
import "@/styles/cards.css";

export default function Home() {

  useEffect(() => {
    console.log("Integrantes:", integrantes); 

    const checkIntegrantes = () => {
      if (integrantes.length === 0) {
        console.error("Nenhum integrante encontrado");
      } else {
        console.log("Integrantes carregados:", integrantes);
      }
    };

    checkIntegrantes();
  }, []);

  return (
    <main className="main">
      <h1 className="title">Portfólio de Avaliações</h1>

      <div className="cards-container">
        <div className="card-row">
          {integrantes.slice(0, 3).map((integrante) => (
            <Link key={integrante.id} href={`/cards/${integrante.nome.toLowerCase()}`}>
              <div className="card">
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
            </Link>
          ))}
        </div>

        <div className="card-row">
          {integrantes.slice(3, 5).map((integrante) => (
            <Link key={integrante.id} href={`/cards/${integrante.nome.toLowerCase()}`}>
              <div className="card">
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
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
