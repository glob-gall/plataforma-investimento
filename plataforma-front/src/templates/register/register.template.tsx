import React from 'react'
import {RegisterFormData, RegisterTemplateProps} from './register.types'
import {
    Box,
    Grid,
    Snackbar,
    Alert,
    TextField,
    Typography,
    Link,
} from '@mui/material'
import * as TemplateContainer from './register.container';
import * as Styles from './register.styles';
import {LoadingButton} from "@mui/lab";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {Controller, useForm} from "react-hook-form";

const RegisterTemplate: React.FC<RegisterTemplateProps> = () => {

    const { register, control, getValues, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

    return (
        <TemplateContainer.RegisterContainer>
            {({ loading, showError, error, actions }) => (
                <Grid container component="main" sx={{ height: '100vh', width: '100%' }}>
                        <Styles.VideoContainer
                            component="video"
                            muted
                            autoPlay
                            loop
                            xs={7}
                            sx={{
                                objectFit: 'cover'
                            }}
                        >
                            <source src={actions.randomBackground()} type="video/mp4"/>
                        </Styles.VideoContainer>
                    <Grid item xs px={3} py={5} >
                        <Box
                            sx={{
                                marginTop: 8,
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Oink!
                            </Typography>
                            <Typography>
                                Registre-se agora na nossa plataforma.
                            </Typography>
                            <Box component="form" method="post" action="#" noValidate autoComplete="off" sx={{ mt: 1, width: '95%' }} onSubmit={handleSubmit(actions.submit)}>

                                <Box
                                sx={{
                                    marginTop: 2,
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    gap:2,
                                }}
                                 >



                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Nome"
                                        type="text"
                                        autoComplete="first_name"
                                        error={!!errors.first_name}
                                        helperText={errors.first_name?.message}
                                        {...register("first_name", {
                                            required: "Este campo é obrigatório.",
                                            minLength: {
                                                value: 3,
                                                message: "O nome deve ter no mínimo 3 caracteres"
                                            }
                                        })}
                                        autoFocus
                                        />

                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Sobrenome"
                                        type="text"
                                        autoComplete="last_name"
                                        autoFocus
                                        error={!!errors.last_name}
                                        helperText={errors.last_name?.message}
                                        {...register("last_name", {
                                            required: "Este campo é obrigatório.",
                                            minLength: {
                                                value: 3,
                                                message: "O sobrenome deve ter no mínimo 3 caracteres"
                                            }
                                        })}
                                        />

                                </Box>

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    autoComplete="email"
                                    autoFocus
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    {...register("email", {
                                            required: "Este campo é obrigatório.",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Digite um email válido"
                                            }
                                        }
                                    )}
                                />

                                <Box
                                sx={{
                                    marginTop: 2,
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    gap:2,
                                }}
                                 >
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Senha"
                                        type="password"
                                        id="password"
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        autoComplete="current-password"
                                        {...register("password", {
                                            required: "Este campo é obrigatório.",
                                            minLength: {
                                                value: 6,
                                                message: "A deve ter no mínimo 6 caracteres"
                                            }
                                        })
                                        }
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
                                        {...register("password_confirmation", {
                                            required: "Este campo é obrigatório.",
                                            minLength: {
                                                value: 6,
                                                message: "A senha deve ter no mínimo 6 caracteres"
                                            },
                                            validate: (value) => {
                                                const { password } = getValues();
                                                return password === value || "As senhas devem ser iguais";
                                            }
                                        })
                                        }
                                    />
                                </Box>

                                <Box sx={{mt:2}}>
                                    <Controller
                                        name="birth"
                                        control={control}
                                        rules={{
                                            required: "Este campo é obrigatório.",
                                            validate: (value) => {
                                                if(isNaN(value as unknown as number)) return "Digite uma data válida"
                                                const date = value;
                                                const today = new Date();
                                                if(date < new Date('1900-01-01')) return "A data de nascimento deve ser posterior a 01/01/1900";
                                                if(date > today) return "A data de nascimento deve ser anterior a data atual";
                                                return true;
                                            }
                                        }}
                                        render={({ field }) => (
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <Styles.DateInput
                                                           label="Data de Nascimento"
                                                           required
                                                           format="DD-MM-YYYY"
                                                           name={"birth"}
                                                           disableFuture
                                                           value={field.value}
                                                           error={!!errors.birth}
                                                           onChange={(date) => field.onChange(date.$d)}
                                                           helperText={errors.birth?.message}
                                                />
                                            </LocalizationProvider>
                                            )}
                                    />

                                </Box>

                                <Snackbar open={showError} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={3000} onClose={actions.hideErrors}>
                                    <Alert severity="error">{error}</Alert>
                                </Snackbar>
                                <LoadingButton
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    loading={loading}
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Registrar
                                </LoadingButton>
                                <Link href="/login" variant="body2">
                                        {"Já tem uma conta? Entre"}
                                </Link>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            )}
        </TemplateContainer.RegisterContainer>
    )
}

export default RegisterTemplate