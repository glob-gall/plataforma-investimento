export interface MovimentacoesInterface {
    id: number;
    description: string;
    date: Date;
    value: number;
    usuario: number;
    conta?: number;
}