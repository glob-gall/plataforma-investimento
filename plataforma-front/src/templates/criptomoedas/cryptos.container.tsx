import {ContainerWithProps} from "@/@common/types/container.types";
import { cryptosService } from "@/services/cryptos/cryptos.service";
import {crypto, cryptosContainerArgs} from "@templates/cryptos/cryptos.types";
import { useEffect,useState } from "react";
import {
    cryptoFormData
} from "@templates/cryptos/components/cryptos-form-modal/cryptos-form-modal.types";
import { useToastHandler } from "@/hooks/toastHandler/use-toastHandler.hook";

export const cryptosContainer = (props: ContainerWithProps<cryptosContainerArgs>) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [formOpen, setFormOpen] = useState(false)
    const [cryptosFromUser, setcryptosFromUser] = useState<crypto[]>([])
    const [cryptoDetails, setcryptoDetails ] = useState<any>([])
    const [movementOpen, setMovementOpen] = useState(false)
    const { handleSetErrors,handleSetMessage } = useToastHandler()

    const cryptosService = new cryptosService()


    async function addcryptoToUser(data: cryptoFormData){
        
        
        try{
            setLoading(true)
            await cryptosService.addcryptoToUser(data)
            await getcryptosFromUser()
            handleSetMessage({message:'crypto criado com sucesso',type:'success'})
        }catch(e){
            handleSetErrors(e)
            console.log(e)
        }finally{
            setLoading(false)
            // setFormOpen(false)
        }
    }

    async function getcryptosFromUser() {
        try{
            setLoading(true)
            const { data } = await cryptosService.getFromUser()
            setcryptosFromUser(data)
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false)
        }
    }

    async function getcryptoDetails(id: number){
        try{
            setLoading(true)
            const { data } = await cryptosService.getDetailsFromUser(id)
            setcryptoDetails(data)
        }catch(e){
            handleSetErrors(e)
        }finally{
            setLoading(false)
        }
    }

    async function deleteFromUser(id: number){
        try{
            setLoading(true)
            await cryptosService.deleteFromUser(id)
            await getcryptosFromUser()
            handleSetMessage({message:'crypto deletado com sucesso',type:'success'})
        }catch(e){
            handleSetErrors(e)
        }finally{
            setLoading(false)
            setMovementOpen(false)
        }
    }

    useEffect(() => {
        getcryptosFromUser()
    }, [])

    return props.children({
        loading,
        formOpen,
        cryptosFromUser,
        cryptoDetails,
        movementOpen,
        actions: {
            setFormOpen,
            setMovementOpen,
            getcryptoDetails,
            deleteFromUser,
            addcryptoToUser
        }
    })

};