export interface RecoverContainerArgs{
    loading: boolean;
    actions: {
        submit: (data: RecoverFormData) => void;
        randomBackground: () => string;
    }
}
export interface RecoverTemplateProps {
    email?: string;
    password?: string;
}

export interface RecoverFormData {
    email: string;
    password: string;
    password_confirmation: string;
}