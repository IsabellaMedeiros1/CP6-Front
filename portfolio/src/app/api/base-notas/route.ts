import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";


export async function GET() {

    const file = await fs.readFile(process.cwd() + "/src/data/notas.json", "utf-8");

    const alunos = JSON.parse(file);
    return NextResponse.json(alunos);
}

// POST:
export async function POST(request: Request) {
    const notasFilePath = path.join(process.cwd(), "src", "data", "notas.json");
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
