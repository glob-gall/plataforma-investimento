import React from 'react'
import Box from '@mui/material/Box'

import { Card, Container } from '@mui/material'

import { useAuth } from '@/hooks/auth/use-auth.hook'
import { ProfileTemplateProps } from './profile.types'

const ProfileTemplate: React.FC<ProfileTemplateProps> = () => {
  const { user } = useAuth()
  console.log({user});
  

  return (
    <Container>
      <Card variant="outlined" style={{ marginRight: 50 }}>
        <Box component="main" sx={{ p: 3 }}>
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </Box>
      </Card>
    </Container>
  )
}

export default ProfileTemplate
