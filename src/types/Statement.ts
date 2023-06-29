import { FigureGraph } from "./Figure";


type Statement = {
    id: number;
    name: string;
    filing: number;
    figures?: FigureGraph;
    titles?: StatementTitle[];
    dates?: StatementDate[];
}

export type StatementTitle = {
    id: number;
    title: string;
    statement: number;
    sequence: number;
}

export type StatementDate = {
    id: number;
    date: Date;
    statement: number;
    sequence: number;
}


export default Statement;