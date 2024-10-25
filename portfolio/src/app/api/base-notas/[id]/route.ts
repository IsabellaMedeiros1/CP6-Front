import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from 'path';
import { Integrante } from "@/types";
import { TipoNotas } from "@/types";


export async function GET(request: Request, { params }: { params: { id: number } }) {
    //Recuperando os dados do peseudo banco de dados em JSON.
    const file = await fs.readFile(process.cwd() + "/src/data/notas.json", "utf-8");

    //PARSEAR O ARQUIVO
    const produtos: Integrante[] = JSON.parse(file);

    //Realizando uma busca na lista de dados com o método de array find() utilizando o id como parâmetro:
    const produto = produtos.find(p => p.id == params.id);

    //Retornar apenas um produto
    return NextResponse.json(produto);
}