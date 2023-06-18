import {
    InvestimentoMovimentacoesProps
} from "@templates/investimentos/components/investimento-movimentacoes-modal/investimento-movimentacoes.types";
import React from "react";
import {
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import {Close, Delete, Edit} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";


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

const rows = [
    { code: 'IBOV11', volume: 100, value: 100, date: '10/10/2021' },
    { code: 'IBOV11', volume: 100, value: 100, date: '10/10/2021' },
    { code: 'IBOV11', volume: 100, value: 100, date: '10/10/2021' },
    { code: 'IBOV11', volume: 100, value: 100, date: '10/10/2021' },

]

const InvestimentoMovimentacoesModal: React.FC<InvestimentoMovimentacoesProps> = ({ details, onDelete, open, onClose, loading }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="instituicoes-form-modal-title"
        >
            <Box sx={style}>
                <Box sx={{width: '100%', alignItems: 'center', justifyContent: 'space-between', display: 'flex'}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Movimentações
                    </Typography>
                    <Box onClick={onClose} sx={{cursor: 'pointer', width: 32, height: 32}}>
                        <Close/>
                    </Box>
                </Box>
                <Box mt={4} sx={{mt: 1}}>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Código</TableCell>
                                    <TableCell align="right">Volume</TableCell>
                                    <TableCell align="right">Valor de compra</TableCell>
                                    <TableCell align="right">Data da movimentação</TableCell>
                                    <TableCell align="right">Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {details.map(({ id, investimento, volume, valor_compra, data_movimentacao }, index) => (
                                    <TableRow
                                        key={`${id}-${index}`}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {investimento?.code}
                                        </TableCell>
                                        <TableCell align="right">{volume}</TableCell>
                                        <TableCell align="right">{valor_compra.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}R$</TableCell>
                                        <TableCell align="right">{data_movimentacao}</TableCell>
                                        <TableCell align="right"><Delete color={"error"} cursor="pointer" onClick={ async () => {
                                            await onDelete(id)
                                        }}/></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Modal>
    );
}

export default InvestimentoMovimentacoesModal;