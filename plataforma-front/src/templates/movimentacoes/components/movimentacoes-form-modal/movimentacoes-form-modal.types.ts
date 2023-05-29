import { Moment } from 'moment'

export interface MovimentacoesFormModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: MovimentacoesFormData) => void
  loading: boolean
  formData: MovimentacoesFormData | null
  formParams: {
    accounts: []
  }
}

export interface MovimentacoesFormData {
  id?: number
  description: string
  value: number
  date: string | Date | Moment
  type?: string
  conta?: number
  categoria: number
}
