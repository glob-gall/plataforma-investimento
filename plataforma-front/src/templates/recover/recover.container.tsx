import { ContainerWithProps } from '@/@common/types/container.types'
import {
  NewPasswordFormData,
  RecoverContainerArgs,
  RecoverFormData,
} from '@/templates/recover/recover.types'
import React from 'react'
import { useAuth } from '@hooks/auth/use-auth.hook'
import { useErrorHandler } from '@/hooks/errorHandler/use-errorHandler.hook'
import { UserService } from '@/services/user/user.service'
import { useRouter } from 'next/router'

export const RecoverContainer = (
  props: ContainerWithProps<RecoverContainerArgs>
) => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const router = useRouter()
  const { handleSetErrors } = useErrorHandler()
  const [submitted, setSubmitted] = React.useState<boolean>(false)

  const userService = new UserService()
  const randomBackground = () => {
    const backgrounds = [
      '/assets/video/home/home.mp4',
      '/assets/video/home/home2.mp4',
      '/assets/video/home/home4.mp4',
      '/assets/video/home/home5.mp4',
    ]
    return backgrounds[Math.floor(Math.random() * backgrounds.length)]
  }

  const submitMail = async (data: RecoverFormData) => {
    const { email } = data
    setLoading(true)
    try {
      await userService.recoverPassword(email)
      setSubmitted(true)
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      err.response.data = {
        errors: [
          {
            message:
              'Não foi possível enviar o email de recuperação de senha, verifique se o email está correto.',
          },
        ],
      }
      handleSetErrors(err)
    } finally {
      setLoading(false)
    }
  }

  const submitRecover = async (data: NewPasswordFormData) => {
    const { token } = router.query
    try {
      setLoading(true)
      await userService.recoverPasswordConfirm({ ...data, code: token })
      router.replace('/login')
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      err.response.data = {
        errors: [
          {
            message:
              'Não foi possível recuperar a senha, verifique se o link de recuperação está correto.',
          },
        ],
      }
      handleSetErrors(err)
    } finally {
      setLoading(false)
    }
  }

  return props.children({
    loading,
    submitted,
    actions: {
      submitMail,
      submitRecover,
      randomBackground,
    },
  })
}
