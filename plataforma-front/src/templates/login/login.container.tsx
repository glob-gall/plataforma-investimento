import {ContainerWithProps} from "@/@common/types/container.types";
import {LoginContainerArgs, LoginFormData} from "@/templates/login/login.types";
import React from "react";
import { useRouter } from 'next/router'
import {AuthService} from "@/services/auth/auth.service";
import {setCookie} from "nookies";
import nookiesConfig from "@config/nookies.config";
import {TOKEN_KEY, USER_KEY} from "@constants/constants";
import {useAuth} from "@hooks/auth/use-auth.hook";


export const LoginContainer = (props: ContainerWithProps<LoginContainerArgs>) => {

    const [loading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string | null>(null)
    const [showError, setShowError] = React.useState<boolean>(false)

    const { actions } = useAuth();

    const randomBackground = () => {
        const backgrounds = [
            '/assets/video/home/home.mp4',
            '/assets/video/home/home2.mp4',
            '/assets/video/home/home4.mp4',
            '/assets/video/home/home5.mp4',
        ]
        return backgrounds[Math.floor(Math.random() * backgrounds.length)]
    }

    const hideErrors = () => {
        setShowError(false);
        setError(null);
    }

    const submit = async (data: LoginFormData) => {
        const { email, password } = data;
        setLoading(true);
        try{
            await actions?.login(email, password);
        }catch(err: unknown){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setError(err.response.data.detail)
            setShowError(true);
        }finally {
            setLoading(false);
        }
    }

    return props.children({
        loading,
        showError,
        error,
        actions: {
            submit,
            setError,
            hideErrors,
            randomBackground
        }
    })
}