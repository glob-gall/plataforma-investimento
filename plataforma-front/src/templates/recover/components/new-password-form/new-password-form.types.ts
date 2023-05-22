import {NewPasswordFormData} from "@templates/recover/recover.types";

export interface RecoverFormProps {
    onSubmit: (data: NewPasswordFormData) => void;
    loading: boolean;
}