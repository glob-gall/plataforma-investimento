import {AxiosInstance} from "axios";
import defaultApi from "@config/api.config";
import { MovimentacoesInterface } from "./movimentacoes.interface";
// import {
//     InstituicoesFormData
// } from "@templates/instituicoes/components/instituicoes-form-modal/instituicoes-form-modal.types";

export class MovimentacoesService {

    private _api: AxiosInstance;

    constructor(api: AxiosInstance = defaultApi) {
        this._api = api;
    }

    async create(id: number, data: MovimentacoesInterface){
        return this._api.put(`/movimentacao/${id}/`, data);
    }

    async delete(id: number){
        return this._api.delete(`/movimentacao/${id}/`);
    }

    async get():Promise<{data:MovimentacoesInterface[]}>{
        return this._api.get('/movimentacao');
    }

}