import React from 'react'
import Box from '@mui/material/Box'

import { Avatar, Button, Card, Container, Grid, TextField, Typography } from '@mui/material'

import { useAuth } from '@/hooks/auth/use-auth.hook'
import { ProfileTemplateProps } from './profile.types'

const ProfileTemplate: React.FC<ProfileTemplateProps> = () => {
  const { user } = useAuth()
  console.log({user});
  

  return (
    <Container>
      <Card variant="outlined" style={{ marginRight: 50 }}>
        <Box component="main" sx={{ p: 3 }}>
        <Avatar sx={{ bgcolor: "#aaa",width: 156, height: 156 }}>LF</Avatar>
        <Typography variant='h5'>🐽 Luís Felipe Galleguillos Campos</Typography>

        <Grid container>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nome"
            type="name"
            id="name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            id="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Data nascimento"
            type="birth"
            id="birth"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email verificado"
            type="email-verified"
            id="email-verified"
          />
          <Button variant='contained' disabled>Salvar</Button>
          <Typography >Usuário desde 02/04/2023</Typography>
        </Grid>
        </Box>
      </Card>
    </Container>
  )
}

export default ProfileTemplate
