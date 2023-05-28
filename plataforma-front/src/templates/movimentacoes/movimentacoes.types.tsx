import { MovimentacoesFormData } from '@templates/movimentacoes/components/movimentacoes-form-modal/movimentacoes-form-modal.types'

export interface MovimentacoesContainerArgs {
  loading: boolean
  movimentacoes: any
  formOpen: boolean
  deleteDialogOpen: boolean
  formData: any
  formParams: {
    accounts: any[]
    categories?: any[]
  }
  actions: {
    setFormOpen: (value: boolean) => void
    setFormData: (value: any) => void
    setDeleteDialogOpen: (value: boolean) => void
    removeMovimentacao: (id: number) => void
    onFormSubmit: (formData: MovimentacoesFormData) => void
    handleFilters: (value: any, type: string) => void
  }
}
