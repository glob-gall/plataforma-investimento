import {MenuItem, Modal, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {
    InstituicoesFormData,
    InstituicoesFormModalProps
} from "@templates/instituicoes/components/instituicoes-form-modal/instituicoes-form-modal.types";
import {LoadingButton} from "@mui/lab";
import {Close} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import {useEffect} from "react";


const InstituicoesFormModal: React.FC<InstituicoesFormModalProps> = ({ open, onClose, onDelete, formData, instituicoes, onSubmit, loading }) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<InstituicoesFormData>();

    useEffect(() => {
        if(formData) reset(formData);
        else reset({
            instituicao: 1,
            descricao: '',
            agencia: '',
            numero: '',
            digito: '',
        })
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
            aria-labelledby="instituicoes-form-modal-title"
        >
            <Box sx={style}>
                <Box sx={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', display: 'flex' }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Adicionar instituição
                    </Typography>
                    <Box onClick={onClose} sx={{ cursor: 'pointer', width: 32, height: 32 }}>
                        <Close />
                    </Box>
                </Box>
                <Box mt={4} component="form" method="post" action="#" noValidate autoComplete="off" sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        select
                        label="Instituição"
                        defaultValue={formData?.instituicao || ''}
                        disabled={!!formData?.instituicao}
                        {...register("instituicao", { required: true, valueAsNumber: true })}
                    >
                        {instituicoes?.map(({ id, nome }, index) => (
                            <MenuItem key={`${id}-${index}`} value={id}>
                                {nome}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Box mt={2}>
                        <TextField
                            fullWidth
                            placeholder={'Nome de referência'}
                            {...register("descricao", { required: true, maxLength: {
                                    value: 20,
                                    message: 'Digite no máximo 20 caracteres.'
                                } })}
                        />
                    </Box>
                    <Box mt={2}>
                        <TextField
                            sx={{ marginRight: 2 }}
                            defaultValue={formData?.agencia || ''}
                            placeholder={'Agência'}
                            {...register('agencia', { required: true, maxLength: 6, minLength: 4, pattern: {
                                    value: /^[0-9]*$/,
                                    message: 'Somente números'
                                } })}
                        />
                        <TextField
                            sx={{ marginRight: 2 }}
                            placeholder={'Conta'}
                            defaultValue={formData?.numero || ''}
                            {...register('numero', {required:true, maxLength: 10, minLength: 4, pattern: {
                                    value: /^[0-9]*$/,
                                    message: 'Somente números'
                                }})}
                        />
                        <TextField
                            placeholder={'Digito'}
                            defaultValue={formData?.digito || ''}
                            {...register('digito', { required: true, maxLength: 3, minLength: 1, pattern: {
                                    value: /^[0-9]*$/,
                                    message: 'Somente números'
                                } }) }
                        />
                    </Box>
                    <Box mt={6} sx={{ justifyContent: 'flex-end', display: 'flex' }}>
                        <LoadingButton sx={{ marginRight: 2 }} variant="contained" color="error" onClick={onDelete} loading={loading}>Excluir</LoadingButton>
                        <LoadingButton variant="contained" type="submit" loading={loading}>Salvar</LoadingButton>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default InstituicoesFormModal;