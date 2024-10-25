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
  name: string;
  Challenge: Record<string, number[]>;
  Checkpoint: Record<string, number[]>;
  Global: Record<string, number[]>;
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
  id: number;
  name: string;
  Challenge: {
    [subject: string]: number[];
  };
  Checkpoint: {
    [subject: string]: number[];
  };
  Global: {
    [subject: string]: number[];
  };
};
