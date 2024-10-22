"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  integrantes: { id: number; nome: string }[]; 
}

export default function Header({ integrantes }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = integrantes.find(integrante => 
      integrante.nome.toLowerCase() === searchTerm.toLowerCase()
    );

    if (found) {
      router.push(`/cards/${found.id}`);
    }
  };

  return (
    <header>
      <div>
        <h1>
          <Link href="/">
            Portfólio
          </Link>
        </h1>
        <nav>
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Buscar integrante..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              aaaaa
            </button>
          </form>
          <ul>
            {integrantes.map((integrante) => (
              <li key={integrante.id}>
                <Link href={`/cards/${integrante.id}`}>
                  {integrante.nome}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
