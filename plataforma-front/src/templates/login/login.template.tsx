import React from 'react'
import { LoginTemplateProps } from './login.types'
import { Button, Container, Stack, TextField, Typography } from '@mui/material'

const LoginTemplate: React.FC<LoginTemplateProps> = () => {
    return (
        <Container maxWidth="md">
        <Stack direction="column" spacing={2}>
          <Typography variant="h1" component="h2" align="center">
            Login
          </Typography>
  
          <TextField label="Email" variant="outlined" />
          <TextField label="Senha" variant="outlined" />
  
        </Stack>
      </Container>
    )
}

export default LoginTemplate