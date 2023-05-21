export interface MovimentacoesInterface {
    id: number;
    description: string;
    date: Date;
    value: number;
    usuario: number;
    conta?: number;
}

export interface Saldos {
    total:number
    entradas:number
    saidas:number
}
export interface SaldoConta {
    conta:string
    saldo:number
}
export interface SaldoCategoria {
    categoria:string
    saldo:number
}
export interface Categoria {
    key:string
    label:string
}

export type Nullable<T> = T | null;