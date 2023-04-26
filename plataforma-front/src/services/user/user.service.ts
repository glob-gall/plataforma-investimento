import {AxiosInstance} from "axios";
import defaultApi from "@config/api.config";

export class UserService {

    private _api: AxiosInstance;

    constructor(api: AxiosInstance = defaultApi) {
        this._api = api;
    }

    async get(){
        return await this._api.get('/usuario');
    }

}