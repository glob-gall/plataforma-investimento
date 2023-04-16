export interface RegisterContainerArgs{
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
export interface RegisterTemplateProps {
    email?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
    birth?: string;
}