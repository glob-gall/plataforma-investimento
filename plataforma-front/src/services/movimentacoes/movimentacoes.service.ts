import {AxiosInstance} from "axios";
import defaultApi from "@config/api.config";
import { MovimentacoesInterface, SaldoCategoria, SaldoConta, Saldos } from "./movimentacoes.interface";
import {
    MovimentacoesFormData
} from "@templates/movimentacoes/components/movimentacoes-form-modal/movimentacoes-form-modal.types";
// import {
//     InstituicoesFormData
// } from "@templates/instituicoes/components/instituicoes-form-modal/instituicoes-form-modal.types";

export class MovimentacoesService {

    private _api: AxiosInstance;

    constructor(api: AxiosInstance = defaultApi) {
        this._api = api;
    }

    async create(data: MovimentacoesFormData){
        return this._api.post('/movimentacao/', data);
    }

    async update(id: number, data: MovimentacoesFormData){
        return this._api.put(`/movimentacao/${id}/`, data);
    }

    async delete(id: number){
        return this._api.delete(`/movimentacao/${id}/`);
    }

    async get():Promise<{data:MovimentacoesInterface[]}>{
        return this._api.get('/movimentacao');
    }
    async getSaldo():Promise<{data:Saldos}>{
        return this._api.get('/movimentacao/saldos/');
    }
    async getDistricuicaoSaldo():Promise<{data:SaldoConta[]}>{
        return this._api.get('/movimentacao/saldos/distribuicao-saldo/');
    }
    async getMovimentacoesCategorias():Promise<{data:SaldoCategoria[]}>{
        return this._api.get('/movimentacao/saldos/distribuicao-categoria/');
    }

}