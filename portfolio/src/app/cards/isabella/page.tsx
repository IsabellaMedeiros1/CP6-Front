"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { TipoNotas } from '@/types';
import { FaGithub as GitHub } from 'react-icons/fa'; 
import { FaInstagram  as Insta} from "react-icons/fa6";
import { RxLinkedinLogo as Linkedin } from "react-icons/rx";
import "@/styles/paginas.css"; 



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
    <div className="min-h-screen bg-gray-100 p-10 flex flex-col items-center">
      <div className="flex items-center mb-10">
        <Image
          src="/img/isabella.jpeg"
          alt="Foto"
          width={120}
          height={120}
          className="rounded-full" 
        />        
        <div className="ml-6">
          <h1 className="titulo-nome">Isabella Medeiros</h1>
          <p className="descricao">Batatinha quando nasce alguma coisa que esqueci teste de descrição preguiça de pensar em algo cu pinto</p>
          <div className="mt-4 flex space-x-4">
            <Link href="https://linkedin.com" ><Linkedin className="text-3xl hover:text-blue-400 transition duration-300"/></Link>
            <Link href="https://github.com"><GitHub className="text-3xl hover:text-blue-400 transition duration-300" /></Link>
            <Link href="https://instagram.com"><Insta className="text-3xl hover:text-blue-400 transition duration-300"/></Link>
          </div>
        </div>
      </div>

      <div className="grid-notas">
        {Object.entries(mockNotas).map(([type]) => (
          <div key={type} className="card-notas">
            <h3 className="titulo-card">{type}</h3>
            {Object.keys(mockNotas[type]).map((subject) => (
              <div key={subject} className="mt-3">
                <button
                  className="btn-nota"
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
        <div className="modal">
          <div className="modal-content">
            <h3 className="titulo-modal">{modalData.type} - {modalData.subject}</h3>
            <ul className="lista-notas">
              {modalData.notes.length > 0 ? (
                modalData.notes.map((note, index) => (
                  <li key={index} className="texto-nota">{note}</li>
                ))
              ) : (
                <p className="text-gray-600">Sem notas cadastradas.</p>
              )}
            </ul>
            <button onClick={closeModal} className="btn-fechar">
              Fechar
            </button>
          </div>
        </div>
      )}

      <div className="form-container ">
        <h2 className="titulo-form">Adicionar Nota</h2>
        <select
          onChange={(e) => {
            const selectedValue = e.target.value as keyof TipoNotas; 
            setEditType(selectedValue);
            setSelectedSubject('');
          }}
          className="select"
        >
          <option value="">Escolha a Avaliação</option>
          {Object.keys(mockNotas).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="select"
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
          className="input-nota"
        />
        <button onClick={handleAddNote} className="btn-principal">
          Adicionar
        </button>
      </div>

      <div className="form-container">
        <h2 className="titulo-form">Alterar Nota</h2>
        <select
          onChange={(e) => {
            const selectedValue = e.target.value as keyof TipoNotas; 
            setEditType(selectedValue);
            setEditSubject('');
          }}
          className="select"
        >
          <option value="">Escolha a Avaliação</option>
          {Object.keys(mockNotas).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          value={editSubject}
          onChange={(e) => setEditSubject(e.target.value)}
          className="select"
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
          placeholder="Nota a ser alterada"
          value={noteToEdit}
          onChange={(e) => setNoteToEdit(e.target.value)}
          className="input-nota"
        />
        <input
          type="number"
          placeholder="Nova Nota"
          value={noteValue}
          onChange={(e) => setNoteValue(e.target.value)}
          className="input-nota"
        />
        <button onClick={handleEditNote} className="btn-principal">
          Alterar
        </button>
      </div>
    </div>
  );
}
