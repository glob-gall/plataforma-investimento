import {ContainerWithProps} from "@/@common/types/container.types";
import {LoginContainerArgs, LoginFormData} from "@/templates/login/login.types";
import React from "react";
import {useAuth} from "@hooks/auth/use-auth.hook";
import { useToastHandler } from "@/hooks/toastHandler/use-toastHandler.hook";


export const LoginContainer = (props: ContainerWithProps<LoginContainerArgs>) => {

    const [loading, setLoading] = React.useState<boolean>(false)
    const {handleSetErrors,handleSetMessage} = useToastHandler()

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


    const submit = async (data: LoginFormData) => {
        const { email, password } = data;
        setLoading(true);
        try{
            await actions?.login(email, password);
        }catch(err: unknown){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            handleSetErrors(err)
        }finally {
            handleSetMessage({message:'Logado com sucesso!',type:'success'})
            setLoading(false);
        }
    }

    return props.children({
        loading,
        actions: {
            submit,
            randomBackground
        }
    })
}