import {AxiosInstance} from "axios";
import defaultApi from "@config/api.config";
import {
    InstituicoesFormData
} from "@templates/instituicoes/components/instituicoes-form-modal/instituicoes-form-modal.types";

export class InstituicoesService {

    private _api: AxiosInstance;

    constructor(api: AxiosInstance = defaultApi) {
        this._api = api;
    }

    async getAddedToUser(){
        return this._api.get('/usuario/contas');
    }

    async addToUser(data: InstituicoesFormData){
        return this._api.post('/usuario/contas/', data);
    }

    async updateToUser(id: number, data: InstituicoesFormData){
        return this._api.put(`/usuario/contas/${id}/`, data);
    }

    async deleteToUser(id: number){
        return this._api.delete(`/usuario/contas/${id}/`);
    }

    async get(){
        return this._api.get('/instituicoes');
    }

}