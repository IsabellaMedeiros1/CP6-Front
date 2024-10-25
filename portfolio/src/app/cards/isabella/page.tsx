"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { TipoNotas } from '@/types';
import { FaGithub as GitHub } from 'react-icons/fa';
import { FaInstagram as Insta } from "react-icons/fa6";
import { RxLinkedinLogo as Linkedin } from "react-icons/rx";
import "@/styles/paginas.css";

export default function Isabella() {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [noteValue, setNoteValue] = useState<string>('');
  const [notes, setNotes] = useState<TipoNotas | null>(null);
  const [modalData, setModalData] = useState<{ type: string; subject: string; notes: string[] }>({ type: '', subject: '', notes: [] });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editType, setEditType] = useState<keyof TipoNotas>('Challenge');
  const [editSubject, setEditSubject] = useState<string>('');
  const [noteToEdit, setNoteToEdit] = useState<string>('');
  const [confirmationMessage, setConfirmationMessage] = useState<string>(''); // Mensagem de confirmação

  // Função para buscar as notas da API
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/base-notas/1');
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error('Erro ao buscar notas da API:', error);
      }
    };

    fetchNotes();
  }, []);

  const openModal = (type: keyof TipoNotas, subject: string) => {
    if (notes) {
      const notesToDisplay = type === "Global"
        ? notes[type][subject].map((note: number, index: number) => `${index + 1}º semestre: ${note}`)
        : notes[type][subject].map((note: number, index: number) => `${index + 1}ª sprint: ${note}`);

      setModalData({ type, subject, notes: notesToDisplay });
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData({ type: '', subject: '', notes: [] });
  };

  // Função para adicionar nota via API
  const handleAddNote = async () => {
    if (selectedSubject && noteValue && editType) {
      const newNote = Number(noteValue);

      if (isNaN(newNote)) {
        console.error('O valor da nota é inválido.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/base-notas/1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tipo: editType,        // Ajustado para "tipo"
            disciplina: selectedSubject, // Ajustado para "disciplina"
            valor: newNote,        // Ajustado para "valor"
          }),
        });

        if (response.ok) {
          const updatedNotes = await response.json();
          setNotes(updatedNotes);
          setNoteValue('');
          // Exibe a mensagem de sucesso por 3 segundos
          setConfirmationMessage('Nota adicionada com sucesso!');
          setTimeout(() => setConfirmationMessage(''), 3000);
        } else {
          const errorData = await response.json();
          console.error('Erro ao adicionar nota:', errorData);
        }
      } catch (error) {
        console.error('Erro ao adicionar nota:', error);
      }
    }
  };

  // Função para editar nota via API
  const handleEditNote = async () => {
    if (editSubject && noteToEdit && noteValue && editType) {
      const oldNote = Number(noteToEdit);
      const newNote = Number(noteValue);

      if (isNaN(oldNote) || isNaN(newNote)) {
        console.error('Valores das notas são inválidos.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/base-notas/1', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tipo: editType,        // Ajustado para "tipo"
            disciplina: editSubject, // Ajustado para "disciplina"
            valorAntigo: oldNote,  // Ajustado para "valorAntigo"
            novoValor: newNote,     // Ajustado para "novoValor"
          }),
        });

        if (response.ok) {
          const updatedNotes = await response.json();
          setNotes(updatedNotes);
          setNoteToEdit('');
          setNoteValue('');
          // Exibe a mensagem de sucesso por 3 segundos
          setConfirmationMessage('Nota alterada com sucesso!');
          setTimeout(() => setConfirmationMessage(''), 3000);
        } else {
          const errorData = await response.json();
          console.error('Erro ao editar nota:', errorData);
        }
      } catch (error) {
        console.error('Erro ao editar nota:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex flex-col items-center">
      {/* Seção de perfil */}
      <div className="form-container mb-10 bg-blue-300 border border-gray-400 rounded-lg p-6 border-collapse">
        <Image
          src="/img/isabella.jpeg"
          alt="Foto de Isabella"
          width={120}
          height={120}
          className="rounded-full"
        />
        <div className="ml-6">
          <h1 className="titulo-nome">Isabella Medeiros</h1>
          <p className="descricao">Batatinha quando nasce alguma coisa que esqueci teste de descrição preguiça de pensar em algo cu pinto</p>
          <div className="mt-4 flex space-x-4">
            <Link href="https://linkedin.com"><Linkedin className="text-3xl hover:text-blue-400 transition duration-300" /></Link>
            <Link href="https://github.com"><GitHub className="text-3xl hover:text-blue-400 transition duration-300" /></Link>
            <Link href="https://instagram.com"><Insta className="text-3xl hover:text-blue-400 transition duration-300" /></Link>
          </div>
        </div>
      </div>

      {/* Mensagem de confirmação */}
      {confirmationMessage && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {confirmationMessage}
        </div>
      )}

      {/* Seção de notas */}
      <div className="grid-notas">
        {notes && ['Challenge', 'Global', 'Checkpoint'].map((type) => (
          <div key={type} className="card-notas">
            <h3 className="titulo-card">{type}</h3>
            {Object.keys(notes[type as keyof TipoNotas]).map((subject) => (
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

      {/* Modal de notas */}
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

      {/* Formulário para adicionar nota */}
      <div className="form-container">
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
          {notes && ['Challenge', 'Global', 'Checkpoint'].map((type) => (
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
          {editType && notes && Object.keys(notes[editType]).map((subject) => (
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
        <button onClick={handleAddNote} className="btn-add-nota bg-[#007BFF] text-white hover:bg-[#0056b3] transition duration-200 px-4 py-2 rounded-full shadow-md">
          Adicionar
        </button>
      </div>


      {/* Formulário para editar nota */}
      {/* Formulário para editar nota */}
      <div className="form-container">
        <h2 className="titulo-form">Editar Nota</h2>
        <select
          onChange={(e) => {
            const selectedValue = e.target.value as keyof TipoNotas;
            setEditType(selectedValue);
            setEditSubject('');
          }}
          className="select mb-4" // Margem inferior adicionada
        >
          <option value="">Escolha a Avaliação</option>
          {notes && ['Challenge', 'Global', 'Checkpoint'].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          value={editSubject}
          onChange={(e) => setEditSubject(e.target.value)}
          className="select mb-4" // Margem inferior adicionada
        >
          <option value="">Escolha a Matéria</option>
          {editType && notes && Object.keys(notes[editType]).map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <select
          value={noteToEdit}
          onChange={(e) => setNoteToEdit(e.target.value)}
          className="select mb-4" // Margem inferior adicionada
        >
          <option value="">Escolha a Nota para Editar</option>
          {editSubject && notes && notes[editType][editSubject].map((note: number, index: number) => (
            <option key={index} value={note}>
              {note}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Novo Valor"
          value={noteValue}
          onChange={(e) => setNoteValue(e.target.value)}
          className="input mb-4" // Margem inferior adicionada
        />
        <button
          onClick={handleEditNote}
          className="btn-add-nota bg-[#007BFF] text-white hover:bg-[#0056b3] transition duration-200 px-4 py-2 rounded-full shadow-md"
        >
          Editar
        </button>
      </div>

    </div>
  );
}
