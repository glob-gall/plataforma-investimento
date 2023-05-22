import {RecoverFormData} from "@templates/recover/recover.types";

export interface RecoverFormProps {
    onSubmit: (data: RecoverFormData) => void;
    loading: boolean;
}