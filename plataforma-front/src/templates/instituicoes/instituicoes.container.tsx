import React, {useEffect} from "react";
import {InstituicoesContainerArgs} from "@templates/instituicoes/instituicoes.types";
import {ContainerWithProps} from "@/@common/types/container.types";
import {InstituicoesInterface} from "@/services/instituicoes/instituices.interface";
import {InstituicoesService} from "@/services/instituicoes/instituicoes.service";
import {
    InstituicoesFormData
} from "@templates/instituicoes/components/instituicoes-form-modal/instituicoes-form-modal.types";

export const InstituicoesContainer = (props: ContainerWithProps<InstituicoesContainerArgs>) => {

    const instituicoesService = new InstituicoesService();
    const [loading, setLoading] = React.useState<boolean>(false)
    const [formOpen, setFormOpen] = React.useState(false)
    const [formData, setFormData] = React.useState<InstituicoesFormData | null>(null)
    const [instituicoesFromUser, setInstituicoesFromUser] = React.useState<InstituicoesInterface[]>([])


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
            }else{
                await instituicoesService.addToUser(data)
            }
        }catch(e){
            console.error(e);
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
        }catch (e){

        }finally {
            setLoading(false)
            setFormOpen(false)
        }
        await getInstituicoesFromUser()
    }

    async function addFormData(item: any){
        console.log(item)
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