import { ContainerWithProps } from "@/@common/types/container.types";
import { EditUserFormData, ProfileContainerArgs } from "./profile.types";
import React, { useCallback, useState } from "react";
import { UserService } from "@/services/user/user.service";
import pigMoneyEmoji from "@/utils/emojis/pigMoneyEmoji";
import { useToastHandler } from "@/hooks/toastHandler/use-toastHandler.hook";
import { useAuth } from "@/hooks/auth/use-auth.hook";


export const ProfileContainer = (props: ContainerWithProps<ProfileContainerArgs>) => {

    const [loading, setLoading] = React.useState<boolean>(false)
    const [emoji,setEmoji] = useState<string>('')

    const { actions } = useAuth()

    const userService = new UserService()

    const {handleSetErrors,handleSetMessage} = useToastHandler()

    const onFormSubmit = useCallback(async (data:EditUserFormData)=>{
      setLoading(true)
      try{
        const { data: user } = await userService.put(data)
        actions?.setUser(user)
      }catch(err: any){
        console.log(err)
        handleSetErrors(err)
    }finally {
        setLoading(false);
        handleSetMessage({message:'Perfil editado con sucesso!',type:'success'})
    }
    },[userService,handleSetErrors])


    React.useEffect(()=>{
        setEmoji(pigMoneyEmoji())
      },[setEmoji])
    

    return props.children(
        {
            loading,
            emoji,
            actions:{
                onFormSubmit,
            }
        }
    )
}
    