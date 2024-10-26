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
export interface Integrante {
  id: number;
  nome: string; 
  Challenge: Record<string, number[]>;
  Checkpoint: Record<string, number[]>;
  Global: Record<string, number[]>;
}

export const integrantes: Integrante[] = [
  { id: 1, nome: "Isabella", Challenge: {}, Checkpoint: {}, Global: {} },
  { id: 2, nome: "Cristian", Challenge: {}, Checkpoint: {}, Global: {} },
  { id: 3, nome: "Paula", Challenge: {}, Checkpoint: {}, Global: {} },
  { id: 4, nome: "Igor", Challenge: {}, Checkpoint: {}, Global: {} },
  { id: 5, nome: "Guilherme", Challenge: {}, Checkpoint: {}, Global: {} },
];

export interface HeaderProps {
  integrantes: { id: number; nome: string }[]; 
}
export interface Notas {
  [type: string]: {
    [subject: string]: number[] | undefined; 
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
  tipo: keyof Integrante; 
  disciplina: string;     
  valor: number;          
}
