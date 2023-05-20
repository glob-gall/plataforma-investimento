import {InstituicoesInterface} from "@/services/instituicoes/instituices.interface";
import {
    InstituicoesFormData
} from "@templates/instituicoes/components/instituicoes-form-modal/instituicoes-form-modal.types";

export interface InstituicoesTemplateProps {
    instituicoes: InstituicoesInterface[];
}

export interface Instituicao {
    codigo: number
    id:number
    ispb:string
    nome:string
    thumb:string
}
export interface Conta {
    id:number
    agencia:string
    descricao:string
    digito:number
    numero:string
    instituicao:Instituicao
}

export interface InstituicoesContainerArgs {
    instituicoesFromUser: Conta[];
    loading: boolean;
    formOpen: boolean;
    formData: InstituicoesFormData | null;
    actions: {
        onModalSubmit: (data: InstituicoesFormData) => void;
        setFormOpen: (value: boolean) => void;
        setFormData: (value: InstituicoesFormData | null) => void;
        addFormData: (item: Conta) => void;
        onModalDelete: () => void;
    }
}