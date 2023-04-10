export interface LoginContainerArgs{
    loading: boolean;
    showError: boolean;
    error: string | null;
    actions: {
        submit: (e: React.FormEvent<HTMLFormElement>) => void;
        setError: (error: string | null) => void;
        hideErrors: () => void;
        randomBackground: () => string;
    }
}
export interface LoginTemplateProps {
    email?: string;
    password?: string;
}