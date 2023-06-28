import {
    InvestimentoFormData,
    InvestimentoFormModalProps
} from "@templates/investimentos/components/investimento-form-modal/investimento-form-modal.types";
import {MenuItem, Modal, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {Close} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import React, { useEffect, useState } from "react";
import {Controller, useForm} from "react-hook-form";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import * as Styles from "@templates/movimentacoes/components/movimentacoes-form-modal/movimentacoes-form-modal.styles";
import moment from "moment";

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

export const InvestimentoFormModal: React.FC<InvestimentoFormModalProps> = ({ investimentos, open, onClose, onSubmit, loading }) => {

    const [ selectedInvestimento, setSelectedInvestimento ] = useState<any>(null)

    const { register, handleSubmit, getValues, control, formState: { errors }, watch } = useForm<InvestimentoFormData>();

    const watchInvestimento = watch('investimento')

    useEffect(() => {
        if (watchInvestimento) {
            console.log(getValues('investimento'))
            setSelectedInvestimento(investimentos[getValues('investimento')])
        }
    }, [ watchInvestimento])

    return(
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="instituicoes-form-modal-title"
        >
            <Box sx={style}>
                <Box sx={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', display: 'flex' }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Adicionar investimento
                    </Typography>
                    <Box onClick={onClose} sx={{ cursor: 'pointer', width: 32, height: 32 }}>
                        <Close />
                    </Box>
                </Box>
                <Box mt={4} component="form" method="post" action="#" noValidate autoComplete="off" sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
                    <Box>
                        <TextField
                            fullWidth
                            select
                            label="Investimento"
                            error={!!errors.instituicao}
                            helperText={errors.instituicao?.message}
                            {...register("investimento", {
                                required: "Escolha um investimento",
                                valueAsNumber: true
                            })}
                        >
                            {investimentos?.map(({ id, code, name }, index) => (
                                <MenuItem key={`${id}-${index}`} value={id}>
                                    {code} - {name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Box mt={2}>
                            <Typography>Cotação atual: {selectedInvestimento?.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}R$</Typography>
                        </Box>
                        <Box mt={2} sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                            <TextField
                                fullWidth
                                defaultValue={''}
                                error={!!errors.instituicao}
                                helperText={errors.instituicao?.message}
                                placeholder={'Valor de compra'}
                                {...register("valor_compra", { required: "Nome é obrigatório.", maxLength: {
                                        value: 20,
                                        message: 'Digite no máximo 20 caracteres.'
                                    } })}
                            />
                            <TextField
                                fullWidth
                                defaultValue={''}
                                error={!!errors.instituicao}
                                helperText={errors.instituicao?.message}
                                placeholder={'Volume'}
                                {...register("volume", { required: "Nome é obrigatório.", maxLength: {
                                        value: 20,
                                        message: 'Digite no máximo 20 caracteres.'
                                    } })}
                            />
                        </Box>
                        <Box mt={2}>
                            <Controller
                                name="data_movimentacao"
                                control={control}
                                rules={{
                                    required: 'Este campo é obrigatório.',
                                    validate: (value) => {
                                        if (isNaN(value as unknown as number))
                                            return 'Digite uma data válida'
                                        const data_movimentacao = value
                                        const today = new Date()
                                        if (data_movimentacao < new Date('1900-01-01'))
                                            return 'A data de movimentação deve ser posterior a 01/01/1900'
                                        if (data_movimentacao > today)
                                            return 'A data de movimentação deve ser anterior a data atual'
                                        return true
                                    },
                                }}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <Styles.DateInput
                                            label="Data da movimentação"
                                            required
                                            format="DD/MM/YYYY HH:mm"
                                            name={'data_movimentacao'}
                                            disableFuture
                                            value={moment(field.value)}
                                            error={!!errors.data_movimentacao}
                                            onChange={(date) => field.onChange(date._d)}
                                            helperText={errors.data_movimentacao?.message}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </Box>
                    </Box>
                    <Box mt={6} sx={{ justifyContent: 'flex-end', display: 'flex' }}>
                        <LoadingButton variant="contained" type="submit" loading={loading}>Salvar</LoadingButton>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )

}