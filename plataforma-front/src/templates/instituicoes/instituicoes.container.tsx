import React, {useEffect} from "react";
import {InstituicoesContainerArgs} from "@templates/instituicoes/instituicoes.types";
import {ContainerWithProps} from "@/@common/types/container.types";
import {InstituicoesInterface} from "@/services/instituicoes/instituices.interface";
import {InstituicoesService} from "@/services/instituicoes/instituicoes.service";
import {
    InstituicoesFormData
} from "@templates/instituicoes/components/instituicoes-form-modal/instituicoes-form-modal.types";
import { useToastHandler } from "@/hooks/toastHandler/use-toastHandler.hook";

export const InstituicoesContainer = (props: ContainerWithProps<InstituicoesContainerArgs>) => {

    const instituicoesService = new InstituicoesService();
    const [loading, setLoading] = React.useState<boolean>(false)
    const [formOpen, setFormOpen] = React.useState(false)
    const [formData, setFormData] = React.useState<InstituicoesFormData | null>(null)
    const [instituicoesFromUser, setInstituicoesFromUser] = React.useState<InstituicoesInterface[]>([])
    const { handleSetErrors, handleSetMessage } = useToastHandler()

    useEffect(() => {
        getInstituicoesFromUser()
    },[])

    async function getInstituicoesFromUser(){
        try{
            setLoading(true)
            const { data } = await instituicoesService.getAddedToUser();
            setInstituicoesFromUser(data)
        }catch(e){
            console.error(e);
        }finally {
            setTimeout(() => {
                setLoading(false)
            }, 300);
        }
    }

    async function onModalSubmit(data: InstituicoesFormData){
        try{
            setLoading(true)
            if(formData?.id){
                await instituicoesService.updateToUser(formData?.id, data)
                handleSetMessage({message:'Conta alterada com sucesso!',type:'success'})
            }else{
                await instituicoesService.addToUser(data)
                handleSetMessage({message:'Conta cadastrada com sucesso!',type:'success'})
            }
        }catch(e){
            handleSetErrors(e)
        }finally {
            setLoading(false)
            setFormOpen(false)
            setFormData(null)
        }
        await getInstituicoesFromUser()
    }

    async function onModalDelete(){
        if(!formData?.id) return;
        try{
            setLoading(true)
            await instituicoesService.deleteToUser(formData?.id)
            handleSetMessage({message:'Conta excluida com sucesso!',type:'success'})
        }catch (e){

        }finally {
            setLoading(false)
            setFormOpen(false)
        }
        await getInstituicoesFromUser()
    }

    async function addFormData(item: any){
        setFormData({
            id: item.id,
            instituicao: item.instituicao.id,
            descricao: item.descricao,
            agencia: item.agencia,
            digito: item.digito,
            numero: item.numero,
        })
    }

    return props.children({
        loading,
        formOpen,
        formData,
        instituicoesFromUser,
        actions: {
            onModalSubmit,
            addFormData,
            setFormData,
            setFormOpen,
            onModalDelete
        }
    })
}