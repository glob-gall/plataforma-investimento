import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Avatar, Backdrop, Box, Card, TextField, Typography } from '@mui/material'
import * as Containers from './profile.container'
import { useAuth } from '@/hooks/auth/use-auth.hook'
import { EditUserFormData, ProfileTemplateProps } from './profile.types'
import { LoadingButton } from '@mui/lab'
import moment from 'moment'

const ProfileTemplate: React.FC<ProfileTemplateProps> = () => {
  const { user } = useAuth()
  const [isFormChanged, setIsFormChanged] = useState<boolean>(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const { register, handleSubmit, watch, getValues } = useForm<EditUserFormData>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      birth: user?.birth,
      emailverified: user?.is_email_verified,
    },
  })

  const { ref, ...rest } = register('avatar')

  const watchName = watch('name')
  const watchBirth = watch('birth')
  const watchAvatar = watch('avatar')

  useEffect(() => {
    if (watchName !== user?.name || watchBirth !== user?.birth || watchAvatar) {
      setIsFormChanged(true)
    } else {
      setIsFormChanged(false)
    }
  }, [user, watchBirth, watchName, watchAvatar])

  useEffect(() => {
    if (watchAvatar && getValues('avatar')[0]) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(getValues('avatar')[0])
    }
  }, [watchAvatar, getValues])

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
                <Box sx={{ width: 156, height: 156, position: 'relative', cursor: 'pointer' }}>
                  <Avatar sx={{ bgcolor: '#aaa', width: 156, height: 156 }} src={avatarPreview || `http://localhost:8000/${user?.avatar}`} onClick={() => {
                    if(fileInputRef.current){
                      fileInputRef.current.click();
                    }
                  }}>
                    {!user?.avatar && `${user?.name.split(' ')[0]?.substring(0, 1)} ${user?.name.split(' ')[1]?.substring(0, 1)}`}
                  </Avatar>
                </Box>

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
                  <input
                    accept="image/*"
                    id="avatar"
                    type="file"
                    hidden
                    {...rest}
                    ref={(e) => {
                      fileInputRef.current = e
                      ref(e)
                    }}
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
