import {InstituicoesInterface} from "@/services/instituicoes/instituices.interface";

export interface InstituicoesFormModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: InstituicoesFormData) => void;
    onDelete: () => void;
    loading: boolean;
    instituicoes?: InstituicoesInterface[];
    formData: InstituicoesFormData | null;
}

export interface InstituicoesFormData{
    id?: number;
    instituicao: number;
    agencia: string;
    numero: string;
    digito: string;
    descricao: string;
}