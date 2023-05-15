export interface RegisterContainerArgs{
    loading: boolean;
    showError: boolean;
    error: string | null;
    actions: {
        submit: (data: RegisterFormData) => Promise<void>;
        setError: (error: string | null) => void;
        hideErrors: () => void;
        randomBackground: () => string;
    }
}
export interface RegisterTemplateProps {
    email?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
    birth?: string;
}

export interface RegisterFormData {
    email: string;
    password: string;
    password_confirmation: string;
    first_name: string;
    last_name: string;
    birth: Date
}