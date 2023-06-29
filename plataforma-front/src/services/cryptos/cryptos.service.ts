import { AxiosInstance } from "axios"
import defaultApi from '@config/api.config'
import { cryptoFormData } from "@/templates/cryptos/components/cryptos-form-modal/cryptos-form-modal.types"
import { cryptosInfo, cryptoDetails, } from "@/templates/cryptos/cryptos.types"


export class CryptosService {
    private _api: AxiosInstance

    constructor(api: AxiosInstance = defaultApi) {
      this._api = api
    }

    async get() {
        return await this._api.get('/cryptos/')
    }

    async addcryptoToUser(data: cryptoFormData) {
        console.log({data});
        return await this._api.post('/usuario/cryptos/', data)
    }
    async getFromUser(): Promise<{data:cryptosInfo[]}> {
        return await this._api.get('/usuario/cryptos/')
    }
    async getDetailsFromUser(id: number): Promise<{data:cryptoDetails[]}> {
        const params = new URLSearchParams()
        params.append('id', `${id}`)
        return await this._api.get('/usuario/cryptos/', { params })
    }

    async deleteFromUser(id: number) {
        return await this._api.delete(`/usuario/cryptos/${id}/`)
    }
}