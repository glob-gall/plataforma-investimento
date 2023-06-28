import { AxiosInstance } from "axios"
import defaultApi from '@config/api.config'
import { InvestimentoFormData } from "@/templates/investimentos/components/investimento-form-modal/investimento-form-modal.types"
import { InvertimentosInfo, InvestimentoDetails, } from "@/templates/investimentos/investimentos.types"


export class InvestimentosService {
    private _api: AxiosInstance

    constructor(api: AxiosInstance = defaultApi) {
      this._api = api
    }

    async get() {
        return await this._api.get('/investimentos/')
    }

    async addInvestimentoToUser(data: InvestimentoFormData) {
        console.log({data});
        return await this._api.post('/usuario/investimentos/', data)
    }
    async getFromUser(): Promise<{data:InvertimentosInfo[]}> {
        return await this._api.get('/usuario/investimentos/')
    }
    async getDetailsFromUser(id: number): Promise<{data:InvestimentoDetails[]}> {
        const params = new URLSearchParams()
        params.append('id', `${id}`)
        return await this._api.get('/usuario/investimentos/', { params })
    }

    async deleteFromUser(id: number) {
        return await this._api.delete(`/usuario/investimentos/${id}/`)
    }
}