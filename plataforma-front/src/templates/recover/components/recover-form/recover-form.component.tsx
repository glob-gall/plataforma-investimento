import { Box, Grid, Link, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import React from 'react'
import { RecoverFormProps } from '@templates/recover/components/recover-form/recover-form.types'
import { useForm } from 'react-hook-form'
import { RecoverFormData } from '@templates/recover/recover.types'
import { Typography } from '@mui/material'

const RecoverForm: React.FC<RecoverFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoverFormData>()

  return (
    <Box
      component="form"
      method="post"
      action="#"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="subtitle1" textAlign="center">
        Digite seu email cadastrado.
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        error={!!errors.email}
        helperText={errors.email?.message}
        autoFocus
        {...register('email', {
          required: 'O campo e-mail é obrigatório.',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'E-mail inválido',
          },
        })}
      />
      <LoadingButton
        fullWidth
        type="submit"
        variant="contained"
        loading={loading}
        sx={{ mt: 3, mb: 2 }}
      >
        Enviar
      </LoadingButton>
    </Box>
  )
}

export default RecoverForm
