
export interface DeleteDialogProps{
    open: boolean;
    message?: string;
    onClose: () => void;
    onConfirm: () => void;
}