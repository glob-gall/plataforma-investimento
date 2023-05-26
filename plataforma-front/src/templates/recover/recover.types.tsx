export interface RecoverContainerArgs{
    loading: boolean;
    submitted:boolean;
    actions: {
        submitMail: (data: RecoverFormData) => void;
        submitRecover:(data:NewPasswordFormData)=> void;
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
    confirm_password: string;

}