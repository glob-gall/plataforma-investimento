
export interface cryptosContainerArgs {
    cryptosFromUser:cryptosInfo,
    loading:boolean
}

export interface crypto{
    key: number,
    volume_total: number,
    valor_medio_compra: number,
    crypto: {
        name: string,
        logo: string,
        value: string,
        code:string
    },
    retorno: number
}
export interface cryptoDetails{
    id: number,
    volume: number,
    data_movimentacao: string,
    crypto: {
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

export interface cryptosInfo {
    resumo:Resumo,
    items: crypto[]
}