import {NewPasswordFormData} from "@templates/recover/recover.types";

export interface NewPasswordFormProps {
    onSubmit: (data: NewPasswordFormData) => void;
    loading: boolean;
}