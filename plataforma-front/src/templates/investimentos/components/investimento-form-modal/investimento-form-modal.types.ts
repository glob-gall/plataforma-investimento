export interface InvestimentoFormModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: InvestimentoFormData) => void;
    onDelete: () => void;
    loading: boolean;
}

export interface InvestimentoFormData{
    id?: number;
    instituicao: number;
    agencia: string;
    numero: string;
    digito: string;
    descricao: string;
}