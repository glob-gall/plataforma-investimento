import React from 'react'
import { RecoverTemplateProps } from './recover.types'
import { Box, Grid, Link, Typography } from '@mui/material'
import * as TemplateContainer from './recover.container'
import * as Styles from './recover.styles'
import RecoverForm from '@templates/recover/components/recover-form/recover-form.component'
import NewPasswordForm from '@templates/recover/components/new-password-form/new-password-form.component'
import { useRouter } from 'next/router'

const RecoverTemplate: React.FC<RecoverTemplateProps> = () => {
  const router = useRouter()
  console.log(router.query)
  const { token } = router.query
  return (
    <TemplateContainer.RecoverContainer>
      {({ loading, submitted, actions }) => (
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
                marginTop: 5,
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
              <Typography>Vamos te ajudar a recuperar a sua senha.</Typography>
              
              <Box mt={6}>
                {token ? (
                <NewPasswordForm onSubmit={actions.submitRecover} loading={loading} /> ) : 
                
                submitted ? (
                  <Typography>Tudo certo! Siga as instruções enviadas no seu email para recuperar sua senha.</Typography>
                ) : (
                  <RecoverForm onSubmit={actions.submitMail} loading={loading} />
                )}
              </Box>

              <Box mt={12}>
                <Link href="/Login" variant="body2">
                  {"Voltar ao Login."}
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </TemplateContainer.RecoverContainer>
  )
}

export default RecoverTemplate
