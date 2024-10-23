export interface Nota {
  materia: string;
  nota: string;
}

export interface NotasPorSprint {
  [sprint: string]: Nota[];
}

export interface Integrante {
  id: number;
  nome: string;
  notas: NotasPorSprint;
}
export interface HeaderProps {
  integrantes: Integrante[];
}

export const integrantes: Integrante[] = [
  {
    id: 1,
    nome: 'Isabella',
    notas: {
      'Sprint 1': [
        { materia: 'CHATBOT', nota: '8.5' },
        { materia: 'DATABASE', nota: '9.0' },
        { materia: 'PYTHON', nota: '7.0' },
        { materia: 'JAVA', nota: '8.0' },
        { materia: 'FRONT-END', nota: '9.5' },
        { materia: 'SOFTWARE', nota: '9.5' },
      ],
      'Sprint 2': [
        { materia: 'CHATBOT', nota: '8.5' },
        { materia: 'DATABASE', nota: '9.0' },
        { materia: 'PYTHON', nota: '7.0' },
        { materia: 'JAVA', nota: '8.0' },
        { materia: 'FRONT-END', nota: '9.5' },
        { materia: 'SOFTWARE', nota: '9.5' },
      ],
      'Sprint 3': [
        { materia: 'CHATBOT', nota: '8.5' },
        { materia: 'DATABASE', nota: '9.0' },
        { materia: 'PYTHON', nota: '7.0' },
        { materia: 'JAVA', nota: '8.0' },
        { materia: 'FRONT-END', nota: '9.5' },
        { materia: 'SOFTWARE', nota: '9.5' },
      ],
    },
  },
  {
    id: 2,
    nome: 'Cristian',
    notas: {
      'Sprint 1': [
        { materia: 'CHATBOT', nota: '8.5' },
        { materia: 'DATABASE', nota: '9.0' },
        { materia: 'PYTHON', nota: '7.0' },
        { materia: 'JAVA', nota: '8.0' },
        { materia: 'FRONT-END', nota: '9.5' },
        { materia: 'SOFTWARE', nota: '9.5' },
      ],
      'Sprint 2': [
        { materia: 'CHATBOT', nota: '8.5' },
        { materia: 'DATABASE', nota: '9.0' },
        { materia: 'PYTHON', nota: '7.0' },
        { materia: 'JAVA', nota: '8.0' },
        { materia: 'FRONT-END', nota: '9.5' },
        { materia: 'SOFTWARE', nota: '9.5' },
      ],
      'Sprint 3': [
        { materia: 'CHATBOT', nota: '8.5' },
        { materia: 'DATABASE', nota: '9.0' },
        { materia: 'PYTHON', nota: '7.0' },
        { materia: 'JAVA', nota: '8.0' },
        { materia: 'FRONT-END', nota: '9.5' },
        { materia: 'SOFTWARE', nota: '9.5' },
      ],
    },
  },
  {
    id: 3,
    nome: 'Paula',
    notas: {
      'Sprint 1': [
        { materia: 'CHATBOT', nota: '100' },
        { materia: 'DATABASE', nota: '95' },
        { materia: 'PYTHON', nota: '100' },
        { materia: 'JAVA', nota: '0' },
        { materia: 'FRONT-END', nota: '60' },
        { materia: 'SOFTWARE', nota: '85' },
      ],
      'Sprint 2': [
        { materia: 'CHATBOT', nota: '90' },
        { materia: 'DATABASE', nota: '68' },
        { materia: 'PYTHON', nota: '100' },
        { materia: 'JAVA', nota: '100' },
        { materia: 'FRONT-END', nota: '90' },
        { materia: 'SOFTWARE', nota: '80' },
      ],
      'Sprint 3': [
        { materia: 'CHATBOT', nota: '100' },
        { materia: 'DATABASE', nota: '90' },
        { materia: 'PYTHON', nota: '71' },
        { materia: 'JAVA', nota: '100' },
        { materia: 'FRONT-END', nota: '100' },
        { materia: 'SOFTWARE', nota: '70' },
      ],
    },
  },
  {
    id: 4,
    nome: 'Igor',
    notas: {
      'Sprint 1': [
        { materia: 'CHATBOT', nota: '8.5' },
        { materia: 'DATABASE', nota: '9.0' },
        { materia: 'PYTHON', nota: '7.0' },
        { materia: 'JAVA', nota: '8.0' },
        { materia: 'FRONT-END', nota: '9.5' },
        { materia: 'SOFTWARE', nota: '9.5' },
      ],
      'Sprint 2': [
        { materia: 'CHATBOT', nota: '8.5' },
        { materia: 'DATABASE', nota: '9.0' },
        { materia: 'PYTHON', nota: '7.0' },
        { materia: 'JAVA', nota: '8.0' },
        { materia: 'FRONT-END', nota: '9.5' },
        { materia: 'SOFTWARE', nota: '9.5' },
      ],
      'Sprint 3': [
        { materia: 'CHATBOT', nota: '8.5' },
        { materia: 'DATABASE', nota: '9.0' },
        { materia: 'PYTHON', nota: '7.0' },
        { materia: 'JAVA', nota: '8.0' },
        { materia: 'FRONT-END', nota: '9.5' },
        { materia: 'SOFTWARE', nota: '9.5' },
      ],
    },
  },
  {
    id: 5,
    nome: 'Guilherme',
    notas: {
      'Sprint 1': [
        { materia: 'CHATBOT', nota: '8.5' },
        { materia: 'DATABASE', nota: '9.0' },
        { materia: 'PYTHON', nota: '7.0' },
        { materia: 'JAVA', nota: '8.0' },
        { materia: 'FRONT-END', nota: '9.5' },
        { materia: 'SOFTWARE', nota: '9.5' },
      ],
      'Sprint 2': [
        { materia: 'CHATBOT', nota: '8.5' },
        { materia: 'DATABASE', nota: '9.0' },
        { materia: 'PYTHON', nota: '7.0' },
        { materia: 'JAVA', nota: '8.0' },
        { materia: 'FRONT-END', nota: '9.5' },
        { materia: 'SOFTWARE', nota: '9.5' },
      ],
      'Sprint 3': [
        { materia: 'CHATBOT', nota: '8.5' },
        { materia: 'DATABASE', nota: '9.0' },
        { materia: 'PYTHON', nota: '7.0' },
        { materia: 'JAVA', nota: '8.0' },
        { materia: 'FRONT-END', nota: '9.5' },
        { materia: 'SOFTWARE', nota: '9.5' },
      ],
    },
  },
];
