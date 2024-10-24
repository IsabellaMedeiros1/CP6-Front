export interface Nota {
  materia: string;
  nota: string;
}

export interface Avaliacao {
  id: number;
  categoria: string;
  nota: number;
}

export interface Integrante {
  id: number;
  nome: string;
}

export const integrantes = [
  { id: 1, nome: "Isabella" },
  { id: 2, nome: "Cristian" },
  { id: 3, nome: "Paula" },
  { id: 4, nome: "Igor" },
  { id: 5, nome: "Guilherme" },
];

export interface HeaderProps {
  integrantes: Integrante[];
}

export interface Notas {
  [key: string]: number[]; 
}

export type TipoNotas = {
  Challenge: Notas;
  Checkpoint: Notas;
  Global: Notas;
};

