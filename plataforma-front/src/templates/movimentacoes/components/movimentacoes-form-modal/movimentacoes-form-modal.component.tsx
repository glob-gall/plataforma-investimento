import {MenuItem, Modal, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {LoadingButton} from "@mui/lab";
import {Close} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import React, {useEffect} from "react";
import {
    MovimentacoesFormData,
    MovimentacoesFormModalProps
} from "@templates/movimentacoes/components/movimentacoes-form-modal/movimentacoes-form-modal.types";
import { categoriasMOCK } from "@/services/movimentacoes/categorias.mock";


const MovimentacoesFormModal: React.FC<MovimentacoesFormModalProps> = ({ open, onClose, formData, onSubmit, loading, formParams }) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<MovimentacoesFormData>();

    useEffect(() => {
        if(formData) reset(formData);
        else reset({})
    }, [formData, open])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return(
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="movimentacoes-form-modal-title"
        >
            <Box sx={style}>
                <Box sx={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', display: 'flex' }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Adicionar movimentação
                    </Typography>
                    <Box onClick={onClose} sx={{ cursor: 'pointer', width: 32, height: 32 }}>
                        <Close />
                    </Box>
                </Box>
                <Box mt={4} component="form" method="post" action="#" noValidate autoComplete="off" sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
                    <Box mt={2}>
                        <TextField
                            fullWidth
                            select
                            label="Categoria"
                            defaultValue={formData?.categoria || ''}
                            disabled={!!formData?.categoria}
                            error={!!errors.categoria}
                            helperText={errors.categoria?.message}
                            {...register("categoria", {
                                required: "Escolha uma categoria.",
                                valueAsNumber: true
                            })}
                        >
                            {categoriasMOCK.map(({ key,label }, index) => (
                                <MenuItem key={`${index}-${key}`} value={key}>
                                    {label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Box mt={2}>
                        <TextField
                            fullWidth
                            select
                            label="Conta"
                            defaultValue={formData?.conta || ''}
                            disabled={!!formData?.conta}
                            error={!!errors.conta}
                            helperText={errors.conta?.message}
                            {...register("conta", {
                                required: "Escolha uma conta",
                                valueAsNumber: true
                            })}
                        >
                            {formParams?.accounts?.map(({ id, descricao,instituicao }, index) => (
                                <MenuItem key={`${id}-${index}`} value={id}>
                                    {instituicao.nome} ({descricao})
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Box mt={2}>
                        <TextField
                            fullWidth
                            defaultValue={formData?.value || ''}
                            error={!!errors.value}
                            helperText={errors.value?.message}
                            placeholder={'Valor'}
                            type={'number'}
                            {...register("value", { required: "Valor é obrigatório." })}
                        />
                    </Box>
                    <Box mt={2}>
                        <TextField
                            fullWidth
                            defaultValue={formData?.description || ''}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                            placeholder={'Descrição'}
                            {...register("description", { required: "Descrição é obrigatória.", maxLength: {
                                    value: 20,
                                    message: 'Digite no máximo 20 caracteres.'
                                } })}
                        />
                    </Box>
                    <Box mt={6} sx={{ justifyContent: 'flex-end', display: 'flex' }}>
                        <LoadingButton variant="contained" type="submit" loading={loading}>Salvar</LoadingButton>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default MovimentacoesFormModal;