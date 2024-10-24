"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { TipoNotas } from '@/types'; 

const mockNotas: TipoNotas = {
  Challenge: {
    "Python": [70, 85, 90, 75],
    "Java": [70, 75, 80, 85],
    "Banco de Dados": [65, 70, 75, 80],
    "Front-End": [88, 92, 85, 90],
    "Software": [78, 82, 85, 80],
    "Chatbot": [80, 85, 78, 90],
  },
  Checkpoint: {
    "Python": [70, 85, 90, 75, 10],
    "Java": [70, 75, 80, 85],
    "Banco de Dados": [65, 70, 75, 80],
    "Front-End": [88, 92, 85, 90],
    "Software": [78, 82, 85, 80],
    "Chatbot": [80, 85, 78, 90],
  },
  Global: {
    "Python": [70, 85, 90, 75],
    "Java": [70, 75, 80, 85],
    "Banco de Dados": [65, 70, 75, 80],
    "Front-End": [88, 92, 85, 90],
    "Software": [78, 82, 85, 80],
    "Chatbot": [80, 85, 78, 90],
  },
};

export default function Isabella() {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [noteValue, setNoteValue] = useState<string>('');
  const [notes, setNotes] = useState<TipoNotas>(mockNotas);
  const [modalData, setModalData] = useState<{ type: string; subject: string; notes: string[] }>({ type: '', subject: '', notes: [] });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editType, setEditType] = useState<keyof TipoNotas>(''); 
  const [editSubject, setEditSubject] = useState<string>('');
  const [noteToEdit, setNoteToEdit] = useState<string>('');

  const openModal = (type: keyof TipoNotas, subject: string) => {
    const notesToDisplay = type === "Global" 
      ? notes[type][subject].map((note: number, index: number) => `${index + 1}º semestre: ${note}`)
      : notes[type][subject].map((note: number, index: number) => `${index + 1}ª sprint: ${note}`);
    
    setModalData({ type, subject, notes: notesToDisplay });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData({ type: '', subject: '', notes: [] });
  };

  const handleAddNote = () => {
    if (selectedSubject && noteValue && editType) {
      setNotes((prevNotes: TipoNotas) => ({
        ...prevNotes,
        [editType]: {
          ...prevNotes[editType],
          [selectedSubject]: [...(prevNotes[editType][selectedSubject] || []), Number(noteValue)],
        },
      }));
      setNoteValue('');
    }
  };

  const handleEditNote = () => {
    if (editSubject && noteToEdit && editType) {
      const updatedNotes = notes[editType][editSubject].map((note: number) => (note === Number(noteToEdit) ? Number(noteValue) : note));
      setNotes((prevNotes: TipoNotas) => ({
        ...prevNotes,
        [editType]: {
          ...prevNotes[editType],
          [editSubject]: updatedNotes,
        },
      }));
      setNoteToEdit('');
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
      <Image
        src="/img/isabella.jpeg"
        alt="Descrição da imagem"
        width={1}
        height={1}
        layout="rounded-full" 
      />        
      <div>
          <h1 className="text-2xl font-bold">Isabella Medeiros</h1>
          <p>Batatinha quando nasce alguma coisa que esqueci teste de descrição preguiça de pensar em algo cu pinto</p>
          <div className="mt-2">
            <Link href="https://linkedin.com" className="mr-4">LinkedIn</Link>
            <Link href="https://github.com">GitHub</Link>
            <Link href="https://instagram.com">Instagram</Link>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.entries(mockNotas).map(([type]) => (
          <div key={type} className="border p-4 rounded shadow-lg">
            <h3 className="font-bold text-lg mb-2">{type}</h3>
            {Object.keys(mockNotas[type]).map((subject) => (
              <div key={subject} className="mt-2">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                  onClick={() => openModal(type as keyof TipoNotas, subject)}
                >
                  {subject}
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">{modalData.type} - {modalData.subject}</h3>
            <ul className="mb-4">
              {modalData.notes.length > 0 ? (
                modalData.notes.map((note, index) => (
                  <li key={index} className="border-b py-1">{note}</li>
                ))
              ) : (
                <p>Sem notas cadastradas.</p>
              )}
            </ul>
            <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded">
              Fechar
            </button>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Adicionar Nota</h2>
        <select
          onChange={(e) => {
            const selectedValue = e.target.value as keyof TipoNotas; 
            setEditType(selectedValue);
            setSelectedSubject('');
          }}
          className="border p-2 mb-2 w-full"
        >
          <option value="">Escolha o Tipo de Nota</option>
          {Object.keys(mockNotas).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="border p-2 mb-2 w-full"
        >
          <option value="">Escolha a Matéria</option>
          {editType && Object.keys(notes[editType]).map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Nova Nota"
          value={noteValue}
          onChange={(e) => setNoteValue(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <button onClick={handleAddNote} className="bg-blue-600 text-white px-4 py-2 rounded">
          Adicionar
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Alterar Nota</h2>
        <select
          onChange={(e) => {
            const selectedValue = e.target.value as keyof TipoNotas; 
            setEditType(selectedValue);
            setEditSubject('');
          }}
          className="border p-2 mb-2 w-full"
        >
          <option value="">Escolha o Tipo de Nota</option>
          {Object.keys(mockNotas).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          value={editSubject}
          onChange={(e) => setEditSubject(e.target.value)}
          className="border p-2 mb-2 w-full"
        >
          <option value="">Escolha a Matéria</option>
          {editType && Object.keys(notes[editType]).map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Nota a Alterar"
          value={noteToEdit}
          onChange={(e) => setNoteToEdit(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Nova Nota"
          value={noteValue}
          onChange={(e) => setNoteValue(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <button onClick={handleEditNote} className="bg-blue-600 text-white px-4 py-2 rounded">
          Alterar
        </button>
      </div>
    </div>
  );
}