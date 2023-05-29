import { AxiosInstance } from 'axios'
import defaultApi from '@config/api.config'
import {
  Categoria,
  MovimentacoesInterface,
  SaldoCategoria,
  SaldoConta,
  Saldos,
} from './movimentacoes.interface'
import { MovimentacoesFormData } from '@templates/movimentacoes/components/movimentacoes-form-modal/movimentacoes-form-modal.types'
import moment from "moment";
// import {
//     InstituicoesFormData
// } from "@templates/instituicoes/components/instituicoes-form-modal/instituicoes-form-modal.types";

export class MovimentacoesService {
  private _api: AxiosInstance

  constructor(api: AxiosInstance = defaultApi) {
    this._api = api
  }

  async create(data: MovimentacoesFormData) {
    return this._api.post('/movimentacao/', data)
  }

  async update(id: number, data: MovimentacoesFormData) {
    return this._api.put(`/movimentacao/${id}/`, data)
  }

  async delete(id: number) {
    return this._api.delete(`/movimentacao/${id}/`)
  }

  async get(filters: any): Promise<{ data: MovimentacoesInterface[] }> {
    const params = new URLSearchParams([['orderby', '-date']])
    if(filters.startDate && filters.endDate)
      params.append('range', `${moment(filters.startDate).utc().format()},${moment(filters.endDate).utc().format()}`)

    if(filters.type && filters.type != 'all'){
      params.append('tipo', filters.type)
    }

    if(filters.category && filters.category != 'all'){
        params.append('category', `${filters.category}`)
    }

    if(filters.account && filters.account != 'all'){
        params.append('account', `${filters.account}`)
    }

    if(filters.search){
      params.append('description', filters.search)
    }

    return this._api.get('/movimentacao', { params })
  }
  async getSaldo(): Promise<{ data: Saldos }> {
    return this._api.get('/movimentacao/saldos/')
  }
  async getDistricuicaoSaldo(): Promise<{ data: SaldoConta[] }> {
    return this._api.get('/movimentacao/saldos/distribuicao-saldo/')
  }
  async getMovimentacoesCategorias(): Promise<{ data: SaldoCategoria[] }> {
    return this._api.get('/movimentacao/saldos/distribuicao-categoria/')
  }
  async getCategorias(): Promise<Categoria[]> {
    return this._api.get('/movimentacao/categorias/')
  }
}
