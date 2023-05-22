import React from 'react'
import { RecoverTemplateProps } from './recover.types'
import { Box, Grid, Typography } from '@mui/material'
import * as TemplateContainer from './recover.container'
import * as Styles from './recover.styles'
import RecoverForm from '@templates/recover/components/recover-form/recover-form.component'
import ConfirmEmail from '@templates/recover/components/confirm-email/confirm-email.component'
import NewPasswordForm from '@templates/recover/components/new-password-form/new-password-form.component'
import { useAuth } from '@hooks/auth/use-auth.hook'

const RecoverTemplate: React.FC<RecoverTemplateProps> = () => {
  const { user } = useAuth()

  return (
    <TemplateContainer.RecoverContainer>
      {({ loading, actions }) => (
        <Grid
          container
          component="main"
          sx={{ height: '100vh', width: '100%' }}
        >
          <Styles.VideoContainer
            component="video"
            muted
            autoPlay
            loop
            xs={8}
            sx={{
              objectFit: 'cover',
            }}
          >
            <source src={actions.randomBackground()} type="video/mp4" />
          </Styles.VideoContainer>
          <Grid item xs px={3} py={5}>
            <Box
              sx={{
                marginTop: 2,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Box>
                <img src="/assets/img/logo.png" alt="logo" />
              </Box>
              <Typography component="h1" variant="h5">
                Oink!
              </Typography>
              <Typography>
                Vamos te ajudar a recuperar a sua senha.
              </Typography>
              {/* <NewPasswordForm onSubmit={actions.submit} loading={loading} /> */}
              <RecoverForm onSubmit={actions.submit} loading={loading} />
              {/* {user && !user.is_email_verified ? ( // São dois formulários : um para passar o email que o código ( ou link ) será enviado e outro para mudar a senha 
                <ConfirmEmail />
              ) : (
                <RecoverForm onSubmit={actions.submit} loading={loading} />
              )} */}
              {/* <Snackbar
                open={showError}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={3000}
                onClose={actions.hideErrors}
              >
                <Alert severity="error">{error}</Alert>
              </Snackbar> */}
            </Box>
          </Grid>
        </Grid>
      )}
    </TemplateContainer.RecoverContainer>
  )
}

export default RecoverTemplate
