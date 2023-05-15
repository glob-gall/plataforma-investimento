import {ContainerWithProps} from "@/@common/types/container.types";
import {RegisterContainerArgs, RegisterFormData} from "@/templates/register/register.types";
import React from "react";
import {AuthService} from "@/services/auth/auth.service";
import {useAuth} from "@hooks/auth/use-auth.hook";


export const RegisterContainer = (props: ContainerWithProps<RegisterContainerArgs>) => {
    const { actions: authActions } = useAuth();
    const [loading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string | null>(null)
    const [showError, setShowError] = React.useState<boolean>(false)

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

    const submit = async (data: RegisterFormData) => {

        setLoading(true);
        try{
            const firstname = data.first_name;
            const lastname = data.last_name;
            const fullname = firstname + ' ' + lastname;
            //DDMMYYYY TO YYYYMMDD
            const birth  = data.birth.getFullYear() + '-' + (data.birth.getMonth() + 1) + '-' + data.birth.getDate();

            await authService.register(data.email,fullname, data.password as string, birth);
            
            await authActions?.login(data.email, data.password);
        }catch(err: unknown){
            console.log(err)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setError()
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