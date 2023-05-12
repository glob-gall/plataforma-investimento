import React, { useCallback, useEffect, useState } from 'react'
import {useForm} from "react-hook-form";

import { Alert, Avatar, Card, Snackbar } from '@mui/material'
import * as Styled from './profile.styles'
import { useAuth } from '@/hooks/auth/use-auth.hook'
import { EditUserFormData, ProfileTemplateProps } from './profile.types'
import pigMoneyEmoji from '@/utils/emojis/pigMoneyEmoji'
import {UserService} from "@/services/user/user.service";
import { LoadingButton } from '@mui/lab';

const ProfileTemplate: React.FC<ProfileTemplateProps> = () => {
  const userService = new UserService()
  const { user } = useAuth()
  const [emoji,setEmoji] = useState('')
  const [loading,setLoading] = useState(false)
  const [isFormChanged,setIsFormChanged]=useState(false)

  const [error, setError] = React.useState<string | null>(null)
  const [showError, setShowError] = React.useState<boolean>(false)


  const { register,handleSubmit,watch } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      birth: user?.birth,
      emailverified: user?.is_email_verified,
    }
  })

  const hideErrors = () => {
    setShowError(false);
    setError(null);
  }

  const onSubmit = useCallback(async (data:EditUserFormData)=>{
    setLoading(true)
    try{
      await userService.put(data)
    }catch(err: any){
      setError(err.response.data.detail)
      setShowError(true);
  }finally {
      setLoading(false);
  }
  },[userService])

  useEffect(()=>{
    setEmoji(pigMoneyEmoji())
  },[setEmoji])
  
  const watchName = watch('name')
  const watchBirth = watch('birth')
  useEffect(()=>{
    if (watchName !== user?.name || watchBirth !== user?.birth) {
      setIsFormChanged(true)
    }else{
      setIsFormChanged(false)
    }
  },[user,watchBirth,watchName])

  return (
    <Styled.Container>
      <Card variant="outlined" style={{ marginRight: 50 }}>

        <Styled.ProfileContainer
          onSubmit={handleSubmit(onSubmit)}
        >
        <Avatar sx={{ bgcolor: "#aaa",width: 156, height: 156 }}>LF</Avatar>
        <Styled.Username variant='h4'>{emoji} {user?.name}</Styled.Username>
          <Styled.ProfileForm>
          <Styled.Input
            margin="normal"
            required
            fullWidth
            label="Nome"
            type="name"
            id="name"
            {...register("name", { required: true })}
          />
          <Styled.Input
            margin="normal"
            required
            fullWidth
            label="Data nascimento"
            id="birth"
            {...register("birth", { required: true })}
          />
          <Styled.Input
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            id="email"
            {...register("email", { required: true })}
            disabled
          />
          <Styled.Input
            margin="normal"
            required
            fullWidth
            label="Email verificado"
            id="emailverified"
            {...register("emailverified", { required: true })}
            disabled
          />

          <Styled.ButtonContainer>
            <LoadingButton
              variant='contained'
              type='submit' 
              disabled={!isFormChanged}
              loading={loading}
            >
              Salvar
            </LoadingButton>
            {/* <Styled.UserCreatedDate style={{color:'#858A8F'}}>
              Usuário desde 02/04/2023
            </Styled.UserCreatedDate> */}
          </Styled.ButtonContainer>
          </Styled.ProfileForm>

        </Styled.ProfileContainer>
      </Card>

      <Snackbar
        open={showError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={hideErrors}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Styled.Container>
  )
}

export default ProfileTemplate
