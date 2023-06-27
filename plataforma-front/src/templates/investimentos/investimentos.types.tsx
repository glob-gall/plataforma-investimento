
export interface InvestimentosContainerArgs {
    investimentosFromUser:Investimento[],
    loading:boolean
}

export interface Investimento{
    key: number,
    volume_total: number,
    valor_medio_compra: number,
    investimento: {
        name: string,
        logo: string,
        value: string,
        code:string
    },
    retorno: number
}