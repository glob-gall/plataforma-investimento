export interface cryptoFormModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: cryptoFormData) => void;
    onDelete: () => void;
    loading: boolean;
}

export interface cryptoFormData{
    crypto: number;
    valor_compra: number;
    volume: number;
    data_movimentacao: Date;
}