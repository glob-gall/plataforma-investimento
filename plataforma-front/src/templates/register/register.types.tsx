export interface RegisterContainerArgs{
    loading: boolean;
    actions: {
        submit: (data: RegisterFormData) => Promise<void>;
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

export interface RegisterFormProps{
    onSubmit: (data: RegisterFormData) => Promise<void>;
    loading:boolean;
}

export interface RegisterFormData {
    email: string;
    password: string;
    password_confirmation: string;
    first_name: string;
    last_name: string;
    birth: Date
}