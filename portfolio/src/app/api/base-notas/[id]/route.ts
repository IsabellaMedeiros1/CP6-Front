import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from 'path';
import { Integrante } from "@/types";
import { TipoNotas } from "@/types";


export async function GET(request: Request, { params }: { params: { id: number } }) {

    const file = await fs.readFile(process.cwd() + "/src/data/notas.json", "utf-8");
    const alunos: TipoNotas[] = JSON.parse(file);

    const aluno = alunos.find(p => p.id == params.id);
    return NextResponse.json(aluno);
}
