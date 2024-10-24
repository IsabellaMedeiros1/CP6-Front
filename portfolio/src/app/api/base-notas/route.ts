import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Caminho para o arquivo JSON
const notasFilePath = path.join(process.cwd(), "src", "data", "notas.json");

export async function GET() {
    const file = await fs.readFile(notasFilePath, "utf-8");
    const alunos = JSON.parse(file);
    return NextResponse.json(alunos);
}

// POST:
export async function POST(request: Request) {
    const { type, subject, note } = await request.json();

    try {
        const file = await fs.readFile(notasFilePath, "utf-8");
        const data = JSON.parse(file);

        if (!data[type]) {
            return NextResponse.json({ error: "Tipo de avaliação não encontrado." }, { status: 404 });
        }
        if (!data[type][subject]) {
            data[type][subject] = [];
        }

        data[type][subject].push(note);

        await fs.writeFile(notasFilePath, JSON.stringify(data, null, 2), "utf-8");

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao adicionar nota." }, { status: 500 });
    }
}

// PUT
export async function PUT(request: Request) {
    const { type, subject, oldNote, newNote } = await request.json();

    try {
        const file = await fs.readFile(notasFilePath, "utf-8");
        const data = JSON.parse(file);

        if (!data[type]) {
            return NextResponse.json({ error: "Tipo de avaliação não encontrado." }, { status: 404 });
        }
        if (!data[type][subject]) {
            return NextResponse.json({ error: "Disciplina não encontrada." }, { status: 404 });
        }

        const noteIndex = data[type][subject].indexOf(oldNote);
        if (noteIndex === -1) {
            return NextResponse.json({ error: "Nota antiga não encontrada." }, { status: 404 });
        }
        data[type][subject][noteIndex] = newNote;

        await fs.writeFile(notasFilePath, JSON.stringify(data, null, 2), "utf-8");

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao editar nota." }, { status: 500 });
    }
}
