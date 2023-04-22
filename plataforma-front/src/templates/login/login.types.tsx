export interface LoginContainerArgs{
    loading: boolean;
    showError: boolean;
    error: string | null;
    actions: {
        submit: (data: LoginFormData) => void;
        setError: (error: string | null) => void;
        hideErrors: () => void;
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