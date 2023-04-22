import {Grid, MenuItem, Modal, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {
    InstituicoesFormModalProps
} from "@templates/instituicoes/components/instituicoes-form-modal/instituicoes-form-modal.types";
import {LoadingButton} from "@mui/lab";
import {Close} from "@mui/icons-material";


const InstituicoesFormModal: React.FC<InstituicoesFormModalProps> = ({ open, onClose }) => {

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

    const institucoes = [
        {
            value: 'itau',
            label: 'Itaú',
        },
        {
            value: 'bradesco',
            label: 'Bradesco',
        },
        {
            value: 'santander',
            label: 'Santander',
        },
    ];

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
                <Box mt={4}>
                    <TextField
                        fullWidth
                        select
                        label="Instituição"
                        defaultValue="itau"
                    >
                        {institucoes.map(({ value, label }, index) => (
                            <MenuItem key={value + index} value={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Box mt={2}>
                        <TextField fullWidth placeholder={'Nome de referência'}/>
                    </Box>
                    <Box mt={2}>
                        <TextField sx={{ marginRight: 2 }} placeholder={'Agência'}/>
                        <TextField placeholder={'Conta'}/>
                    </Box>
                    <Box mt={2} sx={{ justifyContent: 'flex-end', display: 'flex' }}>
                        <LoadingButton sx={{ marginRight: 2 }} variant="contained" color="error" onClick={() => onClose()}>Excluir</LoadingButton>
                        <LoadingButton variant="contained" onClick={() => onClose()}>Salvar</LoadingButton>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default InstituicoesFormModal;