type Figure = {
    id: string;
    statement: number;
    name: string;
    has_parent: number;
    parent_id?: string;
    children?: Figure[];
    values?: FigureValue[]; 
}

export type FigureValue = {
    id: number;
    value: number;
    figure: string;
    sequence: number;
}

export type FigureGraph = {
    [key: string]: Figure; 
}

export default Figure;