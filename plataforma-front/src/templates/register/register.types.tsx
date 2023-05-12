export interface RegisterContainerArgs{
    loading: boolean;
    actions: {
        submit: (e: React.FormEvent<HTMLFormElement>) => void;
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