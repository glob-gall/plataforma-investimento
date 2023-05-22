import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Avatar, Box, Card, TextField, Typography } from '@mui/material'
import * as Containers from './profile.container'
import { useAuth } from '@/hooks/auth/use-auth.hook'
import { ProfileTemplateProps } from './profile.types'
import { LoadingButton } from '@mui/lab'
import moment from 'moment'

const ProfileTemplate: React.FC<ProfileTemplateProps> = () => {
  const { user } = useAuth()
  const [isFormChanged, setIsFormChanged] = useState<boolean>(false)

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      birth: user?.birth,
      emailverified: user?.is_email_verified,
    },
  })

  const watchName = watch('name')
  const watchBirth = watch('birth')
  useEffect(() => {
    if (watchName !== user?.name || watchBirth !== user?.birth) {
      setIsFormChanged(true)
    } else {
      setIsFormChanged(false)
    }
  }, [user, watchBirth, watchName])

  return (
    <Containers.ProfileContainer>
      {({ loading, emoji, actions }) => (
        <Box
          flex={1}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Box>
            <Card
              variant="outlined"
              sx={{ maxWidth: '800px', width: '800px', p: '24px' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexFlow: 'column',
                }}
              >
                <Avatar sx={{ bgcolor: '#aaa', width: 156, height: 156 }}>
                  LF
                </Avatar>
                <Typography variant="h4">
                  {emoji} {user?.name}
                </Typography>
                <Box
                  component="form"
                  sx={{ maxWidth: '320px' }}
                  onSubmit={handleSubmit(actions.onFormSubmit)}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Nome"
                    type="name"
                    id="name"
                    {...register('name', { required: true })}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Data nascimento"
                    id="birth"
                    {...register('birth', { required: true })}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    type="email"
                    id="email"
                    {...register('email', { required: true })}
                    disabled
                  />
                  <Box flex={1} mt={2}>
                    <LoadingButton
                      variant="contained"
                      fullWidth
                      type="submit"
                      disabled={!isFormChanged}
                      loading={loading}
                    >
                      Salvar
                    </LoadingButton>
                  </Box>
                </Box>
                <Typography variant="body2" mt={2}>
                  Usuário desde:{' '}
                  {moment(user?.date_joined).format('DD/MM/YYYY')}
                </Typography>
              </Box>
            </Card>
          </Box>
        </Box>
      )}
    </Containers.ProfileContainer>
  )
}

export default ProfileTemplate
