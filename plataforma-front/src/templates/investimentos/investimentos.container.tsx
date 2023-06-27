import {ContainerWithProps} from "@/@common/types/container.types";
import { InvestimentosService } from "@/services/investimentos/investimentos.service";
import {Investimento, InvestimentosContainerArgs} from "@templates/investimentos/investimentos.types";
import React, { useEffect } from "react";
import {
    InvestimentoFormData
} from "@templates/investimentos/components/investimento-form-modal/investimento-form-modal.types";
import { useToastHandler } from "@/hooks/toastHandler/use-toastHandler.hook";

export const InvestimentosContainer = (props: ContainerWithProps<InvestimentosContainerArgs>) => {

    const [loading, setLoading] = React.useState<boolean>(false)
    const [formOpen, setFormOpen] = React.useState(false)
    const [investimentosFromUser, setInvestimentosFromUser] = React.useState<Investimento[]>([])
    const [investimentoDetails, setInvestimentoDetails ] = React.useState<any>([])
    const [movementOpen, setMovementOpen] = React.useState(false)
    const { handleSetErrors,handleSetMessage } = useToastHandler()

    const investimentosService = new InvestimentosService()


    async function addInvestimentoToUser(data: InvestimentoFormData){
        
        
        try{
            setLoading(true)
            await investimentosService.addInvestimentoToUser(data)
            await getInvestimentosFromUser()
            handleSetMessage({message:'Investimento criado com sucesso',type:'success'})
        }catch(e){
            handleSetErrors(e)
            console.log(e)
        }finally{
            setLoading(false)
        }
    }

    async function getInvestimentosFromUser() {
        try{
            setLoading(true)
            const { data } = await investimentosService.getFromUser()
            setInvestimentosFromUser(data)
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false)
        }
    }

    async function getInvestimentoDetails(id: number){
        try{
            setLoading(true)
            const { data } = await investimentosService.getFromUser(id)
            setInvestimentoDetails(data)
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false)
        }
    }

    async function deleteFromUser(id: number){
        try{
            setLoading(true)
            await investimentosService.deleteFromUser(id)
            await getInvestimentoDetails()
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getInvestimentosFromUser()
    }, [])

    return props.children({
        loading,
        formOpen,
        investimentosFromUser,
        investimentoDetails,
        movementOpen,
        actions: {
            setFormOpen,
            setMovementOpen,
            getInvestimentoDetails,
            deleteFromUser,
            addInvestimentoToUser
        }
    })

};