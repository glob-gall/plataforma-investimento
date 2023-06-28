export interface InvestimentoFormModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: InvestimentoFormData) => void;
    onDelete: () => void;
    loading: boolean;
}

export interface InvestimentoFormData{
    investimento: number;
    valor_compra: number;
    volume: number;
    data_movimentacao: Date;
}