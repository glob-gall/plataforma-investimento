export interface RecoverContainerArgs{
    loading: boolean;
    submitted:boolean;
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
}
export interface NewPasswordFormData {
    password: string;
    password_confirmation: string;
}