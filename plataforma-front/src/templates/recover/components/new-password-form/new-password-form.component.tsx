import { Box, Grid, Link, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import React from 'react'
import { NewPasswordFormProps } from '@templates/recover/components/new-password-form/new-password-form.types'
import { useForm } from 'react-hook-form'
import { NewPasswordFormData } from '@templates/recover/recover.types'
import { Typography } from '@mui/material'

const NewPasswordForm: React.FC<NewPasswordFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<NewPasswordFormData>()

  return (
    <Box
      component="form"
      method="post"
      action="#"
      noValidate
      autoComplete="off"
      sx={{ mt: 1 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* <Typography variant="h5" textAlign="center">Vamos recuperar sua senha!</Typography> */}
      <Typography variant="subtitle1" textAlign="center" mt={2}>
        Escolha sua nova senha.
      </Typography>
      
      <TextField
        margin="normal"
        required
        fullWidth
        label="Nova Senha"
        type="password"
        id="password"
        error={!!errors.password}
        helperText={errors.password?.message}
        
        {...register('password', {
          required: 'Este campo é obrigatório.',
          minLength: {
            value: 6,
            message: 'A deve ter no mínimo 6 caracteres',
          },
        })}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        label="Confirmação"
        type="password"
        id="password_confirmation"
        error={!!errors.password_confirmation}
        helperText={errors.password_confirmation?.message}
        {...register('password_confirmation', {
          required: 'Este campo é obrigatório.',
          minLength: {
            value: 6,
            message: 'A senha deve ter no mínimo 6 caracteres',
          },
          validate: (value) => {
            const { password } = getValues()
            return password === value || 'As senhas devem ser iguais'
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
      <Grid item xs>
        <Link href="/login" variant="body2">
          Voltar ao Login
        </Link>
      </Grid>
    </Box>
  )
}

export default NewPasswordForm
