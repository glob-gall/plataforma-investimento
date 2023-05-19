import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@mui/material";
import {DeleteDialogProps} from "@organisms/dialogs/delete-dialog/delete-dialog.types";
import React from "react";
import {TransitionProps} from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, onClose, onConfirm, message }) => {

    return(
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Excluir item"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {
                        message || "Tem certeza que deseja excluir este item?"
                    }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Voltar</Button>
                <Button onClick={() => {
                    onConfirm();
                    onClose();
                }}>Excluir</Button>
            </DialogActions>
        </Dialog>
    )

}

export default DeleteDialog;