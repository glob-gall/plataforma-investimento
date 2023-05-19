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

export type Nullable<T> = T | null;