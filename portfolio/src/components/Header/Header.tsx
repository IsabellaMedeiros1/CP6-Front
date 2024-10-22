"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeaderProps } from '@/types';


export default function Header({ integrantes }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    const found = integrantes.find(integrante =>
      integrante.nome.toLowerCase().includes(normalizedSearchTerm) 
    );

    if (found) {
      router.push(`/cards/${found.nome.toLowerCase()}`);
    } else {
      alert("Integrante não encontrado!");
    }
  };

  return (
    <header>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">
          <Link href="/" >
            Portfólio
          </Link>
        </h1>
        <nav>
          <form onSubmit={handleSearch} className="flex">
            <input 
              type="text" 
              placeholder="Buscar integrante..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              🔍
            </button>
          </form>
          <ul className="mt-2 space-y-1">
            {integrantes.map((integrante) => (
              <li key={integrante.id}>
                <Link href={`/cards/${integrante.nome.toLowerCase()}`}>
                  {integrante.nome}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
