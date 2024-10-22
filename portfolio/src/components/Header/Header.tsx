"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../styles/header.css';
import { HeaderProps } from '@/types';

export default function Header({ integrantes }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = integrantes.find(integrante => 
      integrante.nome.toLowerCase() === searchTerm.toLowerCase()
    );

    if (found) {
      router.push(`/cards/${found.nome.toLowerCase()}`); 
    } else {
      alert("Integrante não encontrado");
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">
          <Link href="/">Portfólio</Link>
        </h1>
        <nav className="header-nav">
          <form onSubmit={handleSearch} className="search-search">
            <input 
              type="text" 
              placeholder="Buscar integrante..."
              className="header-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn-header">
              Buscar
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}