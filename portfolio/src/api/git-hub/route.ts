// src/app/api/git-hub/route.ts
import { NextResponse } from 'next/server';

const GITHUB_USERS = [
  "IsabellaMedeiros1",
  "IgorWJ",
  "cristianrcaja",
  "GuiRomanholi",
  "StaniukaitisPaula"
];

const fetchUserData = async (username: string) => {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) {
      throw new Error(`Erro ao buscar dados para o usuário: ${username} (Status: ${res.status})`);
    }
    const user = await res.json();
    return {
      nome: user.login,
      avatar_url: user.avatar_url,
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Falha ao buscar dados de ${username}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
  }
};

export async function GET() {
  try {
    const usersData = await Promise.all(GITHUB_USERS.map(fetchUserData));
    return NextResponse.json(usersData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: (error instanceof Error ? error.message : 'Erro desconhecido') }, { status: 500 });
  }
}
