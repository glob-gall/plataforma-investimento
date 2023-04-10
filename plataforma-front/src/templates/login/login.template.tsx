import React from 'react'
import { LoginTemplateProps } from './login.types'
import {
    Box,
    Grid,
    Link, Snackbar,
    Alert,
    TextField,
    Typography,
} from '@mui/material'
import * as TemplateContainer from './login.container';
import {LoadingButton} from "@mui/lab";

const LoginTemplate: React.FC<LoginTemplateProps> = () => {

    return (
        <TemplateContainer.LoginContainer>
            {({ loading, showError, error, actions }) => (
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <Grid
                        component="video"
                        muted
                        autoPlay
                        loop
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            objectFit: 'cover'
                        }}
                    >
                        <source src={actions.randomBackground()} type="video/mp4"/>
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} elevation={6} square>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Oink!
                            </Typography>
                            <Typography>
                                Chegou a hora de organizar suas finanças em um só lugar.
                            </Typography>
                            <Box component="form" method="post" action="#" noValidate autoComplete="off" sx={{ mt: 1 }} onSubmit={actions.submit}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Senha"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
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
                                    <Link href="#" variant="body2">
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