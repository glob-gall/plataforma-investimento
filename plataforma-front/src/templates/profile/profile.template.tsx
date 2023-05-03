import React, { useEffect, useState } from 'react'

import { Avatar, Button, Card } from '@mui/material'
import * as Styled from './profile.styles'
import { useAuth } from '@/hooks/auth/use-auth.hook'
import { ProfileTemplateProps } from './profile.types'
import PigEmoji from '@/utils/emojis/pigEmoji'


const ProfileTemplate: React.FC<ProfileTemplateProps> = () => {
  const { user } = useAuth()
  console.log({user});
  const [emoji,setEmoji] = useState('')
  
  useEffect(()=>{
    setEmoji(PigEmoji())
  },[setEmoji])
  

  return (
    <Styled.Container>
      <Card variant="outlined" style={{ marginRight: 50 }}>
        <Styled.ProfileContainer>
        <Avatar sx={{ bgcolor: "#aaa",width: 156, height: 156 }}>LF</Avatar>
        <Styled.Username variant='h4'>{emoji} Luís Felipe Galleguillos Campos</Styled.Username>

          <Styled.ProfileForm>
          <Styled.Input
            margin="normal"
            required
            fullWidth
            label="Nome"
            type="name"
            id="name"
          />
          <Styled.Input
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            id="email"
          />
          <Styled.Input
            margin="normal"
            required
            fullWidth
            label="Data nascimento"
            type="birth"
            id="birth"
          />
          <Styled.Input
            margin="normal"
            required
            fullWidth
            label="Email verificado"
            type="email-verified"
            id="email-verified"
          />

          <Styled.ButtonContainer>
            <Button variant='contained' disabled>Salvar</Button>
            <Styled.UserCreatedDate style={{color:'#858A8F'}}>
              Usuário desde 02/04/2023
            </Styled.UserCreatedDate>
          </Styled.ButtonContainer>
          </Styled.ProfileForm>

        </Styled.ProfileContainer>
      </Card>
    </Styled.Container>
  )
}

export default ProfileTemplate
