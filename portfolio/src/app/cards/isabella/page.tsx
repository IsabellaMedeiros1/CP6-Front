"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

interface Integrante {
  nome: string;
  avatar_url: string;
}

const IsabellaPage = () => {
  const [integrante, setIntegrante] = useState<Integrante | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIntegranteData = async () => {
      try {
        const response = await fetch("/api/git-hub");
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados do integrante.");
        }
        const data: Integrante[] = await response.json();
        
        const user = data.find((user) => user.nome === "IsabellaMedeiros1");
        if (user) {
          setIntegrante(user);
        } else {
          throw new Error("Integrante não encontrado.");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
        setError(errorMessage);
      }
    };

    fetchIntegranteData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!integrante) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{integrante.nome}</h1>
      <Image
        src={integrante.avatar_url}
        alt={`Foto de ${integrante.nome}`}
        width={300}
        height={300}
        className="rounded-full"
      />
      <p>Informações adicionais sobre {integrante.nome}</p>
    </div>
  );
};

export default IsabellaPage;
