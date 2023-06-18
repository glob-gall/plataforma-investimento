import { AxiosInstance } from "axios"
import defaultApi from '@config/api.config'


export class InvestimentosService {
    private _api: AxiosInstance

    constructor(api: AxiosInstance = defaultApi) {
      this._api = api
    }

    async get() {
        return await this._api.get('/investimentos/')
    }

    async getFromUser(id: number) {
        const params = new URLSearchParams()
        if(id) params.append('id', `${id}`)
        return await this._api.get('/usuario/investimentos/', { params })
    }

    async deleteFromUser(id: number) {
        return await this._api.delete(`/usuario/investimentos/${id}/`)
    }
}