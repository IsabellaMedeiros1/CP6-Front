
interface Nota {
  disciplina: string; // Nome da disciplina
  valor: number;      // Valor da nota a ser adicionada
}

export interface Avaliacao {
  id: number;
  categoria: string;
  nota: number;
}

export interface Integrante {
  id: number;
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
  [type: string]: {
    [subject: string]: number[] | undefined; // Adiciona undefined para evitar erros
  };
}



export interface TipoNotas {
  Challenge: {
    [subject: string]: number[];
  };
  Checkpoint: {
    [subject: string]: number[];
  };
  Global: {
    [subject: string]: number[];
  };
}

export interface AddNotaRequest {
  tipo: keyof Integrante; // Challenge | Checkpoint | Global
  disciplina: string;     // Nome da disciplina
  valor: number;          // Valor da nota
}
