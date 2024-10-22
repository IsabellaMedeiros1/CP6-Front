export interface Integrante {
    id: number;
    nome: string;
  }
  
export interface HeaderProps {
    integrantes: Integrante[]; 
  }

export const integrantes = [
    { id: 1, nome: "Isabella" },
    { id: 2, nome: "Cristian" },
    { id: 3, nome: "Paula" },
    { id: 4, nome: "Igor" },
    { id: 5, nome: "Guilherme" },
  ];