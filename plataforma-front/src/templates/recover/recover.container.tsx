import {ContainerWithProps} from "@/@common/types/container.types";
import {RecoverContainerArgs, RecoverFormData} from "@/templates/recover/recover.types";
import React from "react";
import {useAuth} from "@hooks/auth/use-auth.hook";
import { useErrorHandler } from "@/hooks/errorHandler/use-errorHandler.hook";
import { UserService } from "@/services/user/user.service";


export const RecoverContainer = (props: ContainerWithProps<RecoverContainerArgs>) => {

    const [loading, setLoading] = React.useState<boolean>(false)
    const {handleSetErrors} = useErrorHandler()
    const [submitted, setSubmitted]= React.useState<boolean>(false)

    const userService = new UserService();
    const randomBackground = () => {
        const backgrounds = [
            '/assets/video/home/home.mp4',
            '/assets/video/home/home2.mp4',
            '/assets/video/home/home4.mp4',
            '/assets/video/home/home5.mp4',
        ]
        return backgrounds[Math.floor(Math.random() * backgrounds.length)]
    }


    const submit = async (data: RecoverFormData) => {
        const { email } = data;
        setLoading(true);
        try{
            await userService.recoverPassword(email);
            setSubmitted(true)
        }catch(err: unknown){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            handleSetErrors(err)
        }finally {
            setLoading(false);
        }
    }

    return props.children({
        loading,
        submitted,
        actions: {
            submit,
            randomBackground
        }
    })
}