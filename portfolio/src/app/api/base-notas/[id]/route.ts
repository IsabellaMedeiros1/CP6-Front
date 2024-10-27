import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { Integrante } from "@/types";
import { AddNotaRequest } from "@/types";

type ParamsContext = { params: { id: string } };

export async function GET(request: Request, context: ParamsContext) {
    const { id } = context.params;

    const file = await fs.readFile(process.cwd() + "/src/data/notas.json", "utf-8");
    const alunos: Integrante[] = JSON.parse(file);

    const aluno = alunos.find(p => p.id === Number(id));

    return NextResponse.json(aluno);
}

export async function POST(request: Request, context: ParamsContext) {
    try {
        const { tipo, disciplina, valor }: AddNotaRequest = await request.json();
        console.log("Dados recebidos para POST:", { tipo, disciplina, valor });
        const filePath = process.cwd() + "/src/data/notas.json";

        const file = await fs.readFile(filePath, "utf-8");
        const integrantes: Integrante[] = JSON.parse(file);

        const aluno = integrantes.find(i => i.id === Number(context.params.id));
        if (!aluno) {
            console.log("Aluno não encontrado:", context.params.id);
            return NextResponse.json({ error: "Aluno não encontrado" }, { status: 404 });
        }

        if (!['Challenge', 'Checkpoint', 'Global'].includes(tipo)) {
            console.log("Tipo de nota inválido:", tipo);
            return NextResponse.json({ error: "Tipo de nota inválido" }, { status: 400 });
        }

        const notasPorTipo = aluno[tipo] as Record<string, number[]>;
        if (!notasPorTipo || !(disciplina in notasPorTipo)) {
            console.log("Disciplina inválida:", disciplina);
            return NextResponse.json({ error: "Disciplina inválida" }, { status: 400 });
        }

        notasPorTipo[disciplina].push(valor);

        await fs.writeFile(filePath, JSON.stringify(integrantes, null, 2), "utf-8");
        console.log("Nota adicionada com sucesso:", { tipo, disciplina, valor });

        return NextResponse.json(aluno, { status: 201 });
    } catch (error) {
        console.error("Erro ao adicionar nota:", error);
        return NextResponse.json({ error: "Erro ao processar a adição" }, { status: 500 });
    }
}

export async function PUT(request: Request, context: ParamsContext) {
    try {
        const { tipo, disciplina, valorAntigo, novoValor }: { tipo: keyof Integrante; disciplina: string; valorAntigo: number; novoValor: number } = await request.json();

        const filePath = process.cwd() + "/src/data/notas.json";
        const file = await fs.readFile(filePath, "utf-8");
        const integrantes: Integrante[] = JSON.parse(file);

        const integranteIndex = integrantes.findIndex(i => i.id === Number(context.params.id));
        if (integranteIndex === -1) {
            return NextResponse.json({ error: "Integrante não encontrado" }, { status: 404 });
        }

        const integrante = integrantes[integranteIndex];

        if (!['Challenge', 'Checkpoint', 'Global'].includes(tipo)) {
            return NextResponse.json({ error: "Tipo de nota inválido" }, { status: 400 });
        }

        const notasPorTipo = integrante[tipo] as Record<string, number[]>;
        if (!(disciplina in notasPorTipo)) {
            return NextResponse.json({ error: "Disciplina não encontrada" }, { status: 404 });
        }

        const notaIndex = notasPorTipo[disciplina].indexOf(valorAntigo);
        if (notaIndex === -1) {
            return NextResponse.json({ error: "Nota não encontrada" }, { status: 404 });
        }

        notasPorTipo[disciplina][notaIndex] = novoValor;

        await fs.writeFile(filePath, JSON.stringify(integrantes, null, 2), "utf-8");

        return NextResponse.json(integrantes[integranteIndex], { status: 200 });
    } catch (error) {
        console.error("Erro ao atualizar integrante:", error);
        return NextResponse.json({ error: "Erro ao processar a atualização" }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: ParamsContext) {
    try {
        const id = Number(context.params.id);
        const filePath = process.cwd() + "/src/data/notas.json";
        const file = await fs.readFile(filePath, "utf-8");
        const alunos: Integrante[] = JSON.parse(file);

        const aluno = alunos.find(p => p.id === id);
        if (!aluno) {
            return NextResponse.json({ error: "Aluno não encontrado" }, { status: 404 });
        }

        const { tipo, disciplina, valor }: { tipo: keyof Integrante; disciplina: string; valor: number } = await request.json();

        console.log("Dados recebidos:", { tipo, disciplina, valor });

        if (!tipo || !disciplina || valor === undefined) {
            return NextResponse.json({ error: "Faltam dados para deletar a nota." }, { status: 400 });
        }

        if (!['Challenge', 'Checkpoint', 'Global'].includes(tipo)) {
            return NextResponse.json({ error: "Tipo de nota inválido" }, { status: 400 });
        }

        const notasPorTipo = aluno[tipo] as Record<string, number[]>;
        if (!(disciplina in notasPorTipo)) {
            return NextResponse.json({ error: "Disciplina não encontrada" }, { status: 404 });
        }

        const notaIndex = notasPorTipo[disciplina].indexOf(valor);
        if (notaIndex === -1) {
            return NextResponse.json({ error: "Nota não encontrada" }, { status: 404 });
        }

        notasPorTipo[disciplina].splice(notaIndex, 1);
        await fs.writeFile(filePath, JSON.stringify(alunos, null, 2), "utf-8");

        return NextResponse.json({ message: "Nota deletada com sucesso!" }, { status: 200 });
    } catch (error) {
        console.error("Erro ao deletar a nota:", error);
        return NextResponse.json({ error: "Erro ao deletar a nota" }, { status: 500 });
    }
}
