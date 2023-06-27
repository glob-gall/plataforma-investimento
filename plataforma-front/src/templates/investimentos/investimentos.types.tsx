
export interface InvestimentosContainerArgs {
    investimentosFromUser:InvertimentosInfo,
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
export interface InvestimentoDetails{
    id: number,
    volume: number,
    data_movimentacao: string,
    investimento: {
        id: number,
        code:string
        name: string,
        logo: string,
        value: string,
    },
    retorno: number
}
export interface Resumo{
    
    "carteira": number,
    "retorno_total": number
    
}

export interface InvertimentosInfo {
    resumo:Resumo,
    items: Investimento[]
}