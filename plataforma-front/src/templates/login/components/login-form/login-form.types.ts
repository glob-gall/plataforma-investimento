import {LoginFormData} from "@templates/login/login.types";

export interface LoginFormProps {
    onSubmit: (data: LoginFormData) => void;
    loading: boolean;
}