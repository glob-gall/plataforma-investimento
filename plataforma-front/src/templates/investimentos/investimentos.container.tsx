import {ContainerWithProps} from "@/@common/types/container.types";
import { InvestimentosService } from "@/services/investimentos/investimentos.service";
import {InvestimentosContainerArgs} from "@templates/investimentos/investimentos.types";
import React, { useEffect } from "react";
import {
    InvestimentoFormData
} from "@templates/investimentos/components/investimento-form-modal/investimento-form-modal.types";

export const InvestimentosContainer = (props: ContainerWithProps<InvestimentosContainerArgs>) => {

    const [loading, setLoading] = React.useState<boolean>(false)
    const [formOpen, setFormOpen] = React.useState(false)
    const [investimentosFromUser, setInvestimentosFromUser] = React.useState<any[]>([])
    const [investimentoDetails, setInvestimentoDetails ] = React.useState<any>([])
    const [movementOpen, setMovementOpen] = React.useState(false)

    const investimentosService = new InvestimentosService()


    async function addInvestimentoToUser(data: InvestimentoFormData){
        try{
            setLoading(true)
            await investimentosService.addInvestimentoToUser(data)
            await getInvestimentosFromUser()
        }catch(e){
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