import {ContainerWithProps} from "@/@common/types/container.types";
import {RegisterContainerArgs} from "@/templates/register/register.types";
import React from "react";
import { useRouter } from 'next/router'
import {AuthService} from "@/services/auth/auth.service";
import {useAuth} from "@hooks/auth/use-auth.hook";


export const RegisterContainer = (props: ContainerWithProps<RegisterContainerArgs>) => {
    const { actions: authActions } = useAuth();
    const [loading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string | null>(null)
    const [showError, setShowError] = React.useState<boolean>(false)

    const router = useRouter()

    const authService = new AuthService();

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

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setLoading(true);
        try{

            const firstname = data.get('first_name') as string;
            const lastname = data.get('last_name') as string;
            const fullname = firstname + ' ' + lastname;
            //DDMMYYYY TO YYYYMMDD
            const birth = (data.get('birth') as string).split('-').reverse().join('-');
           
            await authService.register(data.get('email') as string,fullname,
            data.get('password') as string, birth);
            
            await authActions?.login(data.get('email') as string, data.get('password') as string);
        }catch(err: unknown){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setError(err.response.data.email)
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