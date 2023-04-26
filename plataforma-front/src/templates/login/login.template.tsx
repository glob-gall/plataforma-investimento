import React from 'react'
import {LoginTemplateProps} from './login.types'
import {
    Alert,
    Box,
    Grid, Snackbar,
    Typography,
} from '@mui/material'
import * as TemplateContainer from './login.container';
import * as Styles from './login.styles';
import LoginForm from "@templates/login/components/login-form/login-form.component";
import ConfirmEmail from "@templates/login/components/confirm-email/confirm-email.component";
import {useAuth} from "@hooks/auth/use-auth.hook";

const LoginTemplate: React.FC<LoginTemplateProps> = () => {

    const { user } = useAuth();

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
                            {
                                user && !user.is_email_verified ?
                                    <ConfirmEmail/>
                                    :
                                    <LoginForm onSubmit={actions.submit} loading={loading}/>
                            }
                            <Snackbar open={showError} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={3000} onClose={actions.hideErrors}>
                                <Alert severity="error">{error}</Alert>
                            </Snackbar>
                        </Box>
                    </Grid>
                </Grid>
            )}
        </TemplateContainer.LoginContainer>
    )
}

export default LoginTemplate