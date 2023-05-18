export interface LoginContainerArgs{
    loading: boolean;
    actions: {
        submit: (data: LoginFormData) => void;
        randomBackground: () => string;
    }
}
export interface LoginTemplateProps {
    email?: string;
    password?: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}