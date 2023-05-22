import { ContainerWithProps } from "@/@common/types/container.types";
import { EditUserFormData, ProfileContainerArgs } from "./profile.types";
import React, { useCallback, useEffect, useState } from "react";
import { UserService } from "@/services/user/user.service";
import pigMoneyEmoji from "@/utils/emojis/pigMoneyEmoji";
import { watch } from "fs";
import { useErrorHandler } from "@/hooks/errorHandler/use-errorHandler.hook";
import { useRouter } from "next/router";


export const ProfileContainer = (props: ContainerWithProps<ProfileContainerArgs>) => {

    const [loading, setLoading] = React.useState<boolean>(false)
    const [emoji,setEmoji] = useState<string>('')

    const router = useRouter()

    const userService = new UserService()

    const {handleSetErrors} = useErrorHandler()

    const onFormSubmit = useCallback(async (data:EditUserFormData)=>{
      setLoading(true)
      try{
        await userService.put(data)
        await router.reload()
      }catch(err: any){
        handleSetErrors(err)
    }finally {
        setLoading(false);
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
    