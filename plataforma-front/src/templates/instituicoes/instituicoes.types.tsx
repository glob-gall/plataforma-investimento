import {InstituicoesInterface} from "@/services/instituicoes/instituices.interface";
import {
    InstituicoesFormData
} from "@templates/instituicoes/components/instituicoes-form-modal/instituicoes-form-modal.types";

export interface InstituicoesTemplateProps {
    instituicoes: InstituicoesInterface[];
}

export interface InstituicoesContainerArgs {
    instituicoesFromUser: any;
    loading: boolean;
    formOpen: boolean;
    formData: InstituicoesFormData | null;
    actions: {
        onModalSubmit: (data: InstituicoesFormData) => void;
        setFormOpen: (value: boolean) => void;
        setFormData: (value: InstituicoesFormData | null) => void;
        addFormData: (item: InstituicoesInterface) => void;
        onModalDelete: () => void;
    }
}