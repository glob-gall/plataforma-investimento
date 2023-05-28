import { MovimentacoesService } from '@/services/movimentacoes/movimentacoes.service'
import { useErrorHandler } from '@hooks/errorHandler/use-errorHandler.hook'
import { ContainerWithProps } from '@/@common/types/container.types'
import { MovimentacoesContainerArgs } from '@templates/movimentacoes/movimentacoes.types'
import React, { useEffect } from 'react'
import { InstituicoesFormData } from '@templates/instituicoes/components/instituicoes-form-modal/instituicoes-form-modal.types'
import { MovimentacoesFormData } from '@templates/movimentacoes/components/movimentacoes-form-modal/movimentacoes-form-modal.types'

export const MovimentacoesContainer = (
  props: ContainerWithProps<MovimentacoesContainerArgs>
) => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [movimentacoes, setMovimentacoes] = React.useState<any[]>([])
  const [formOpen, setFormOpen] = React.useState(false)
  const [filters, setFilters] = React.useState<any>({
    type: 'all',
    category: 'all',
    account: 'all',
    start_date: null,
    end_date: null,
  })
  const [formParams, setFormParams] = React.useState<any>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [formData, setFormData] = React.useState<InstituicoesFormData | null>(
    null
  )
  const { handleSetErrors } = useErrorHandler()
  const movimentacoesService = new MovimentacoesService()

  useEffect(() => {
    getMovimentacoes()
    setFormParams({ accounts: props.accounts })
  }, [])

  const getMovimentacoes = async () => {
    try {
      setLoading(true)
      const { data } = await movimentacoesService.get()
      setMovimentacoes(data)
    } catch (err) {
      handleSetErrors(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFilters = (value, type) => {
    setFilters((prev) => ({ ...prev, [type]: value }))
    console.log(filters)
  }

  const onFormSubmit = async (formData: MovimentacoesFormData) => {
    try {
      setLoading(true)
      if (formData.id) {
        await movimentacoesService.update(formData.id, formData)
      } else {
        await movimentacoesService.create(formData)
      }
      await getMovimentacoes()
    } catch (err) {
      handleSetErrors(err)
    } finally {
      setLoading(false)
      setFormOpen(false)
      setFormData(null)
    }
  }

  const removeMovimentacao = async (id: number) => {
    try {
      setLoading(true)
      await movimentacoesService.delete(id)
      await getMovimentacoes()
    } catch (err) {
      handleSetErrors(err)
    } finally {
      setLoading(false)
    }
  }

  return props.children({
    loading,
    movimentacoes,
    formOpen,
    formData,
    formParams,
    deleteDialogOpen,
    actions: {
      setFormOpen,
      setFormData,
      handleFilters,
      setDeleteDialogOpen,
      removeMovimentacao,
      onFormSubmit,
    },
  })
}
