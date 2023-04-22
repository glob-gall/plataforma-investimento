import React from 'react'
import {LoginFormData, LoginTemplateProps} from './login.types'
import {
    Box,
    Grid,
    Link, Snackbar,
    Alert,
    TextField,
    Typography,
} from '@mui/material'
import * as TemplateContainer from './login.container';
import * as Styles from './login.styles';
import {LoadingButton} from "@mui/lab";
import { useForm } from "react-hook-form";

const LoginTemplate: React.FC<LoginTemplateProps> = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

    return (
        <TemplateContainer.LoginContainer>
            {({ loading, showError, error, actions }) => (
                <Grid container component="main" sx={{ height: '100vh', width: '100%' }}>
                        <Styles.VideoContainer
                            component="video"
                            muted
                            autoPlay
                            loop
                            xs={8}
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
                                Chegou a hora de organizar suas finanças em um só lugar.
                            </Typography>
                            <Box component="form" method="post" action="#" noValidate autoComplete="off" sx={{ mt: 1 }} onSubmit={handleSubmit(actions.submit)}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    type="email"
                                    autoComplete="email"
                                    autoFocus
                                    {...register("email", {
                                        required: true,
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "E-mail inválido"
                                        }
                                    })}
                                    aria-invalid={errors.email ? "true" : "false"}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Senha"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    {...register("password", { required: true })}
                                    aria-invalid={errors.password ? "true" : "false"}
                                />

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
                                    Entrar
                                </LoadingButton>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Esqueceu sua senha?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Ainda não tem uma conta? Cadastre-se"}
                                    </Link>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            )}
        </TemplateContainer.LoginContainer>
    )
}

export default LoginTemplate