import React from 'react'
import { RegisterTemplateProps } from './register.types'
import {
    Box,
    Grid,
    Link, Snackbar,
    Alert,
    TextField,
    Typography,
} from '@mui/material'
import * as TemplateContainer from './register.container';
import * as Styles from './register.styles';
import {LoadingButton} from "@mui/lab";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

const RegisterTemplate: React.FC<RegisterTemplateProps> = () => {

    return (
        <TemplateContainer.RegisterContainer>
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
                                Registre-se agora na nossa plataforma.    
                            </Typography>
                            <Box component="form" method="post" action="#" noValidate autoComplete="off" sx={{ mt: 1 }} onSubmit={actions.submit}>
                              <div>

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Nome"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    autoFocus
                                    />

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="last_name"
                                    label="Sobrenome"
                                    name="last_name"
                                    type="text"
                                    autoComplete="last_name"
                                    autoFocus
                                    />

                              </div>

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

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password_confirmation "
                                    label="Confirmação de senha"
                                    type="password"
                                    id="password_confirmation"
                                />
                                <Box sx={{mt:2}}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateField label="Data de Nascimento" 
                                    required
                                    format="DD-MM-YYYY"
                                    />
                                </LocalizationProvider>
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
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            )}
        </TemplateContainer.RegisterContainer>
    )
}

export default RegisterTemplate