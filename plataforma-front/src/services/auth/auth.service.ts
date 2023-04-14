import {AxiosInstance} from "axios";
import defaultApi from "@config/api.config";

export class AuthService {

    private _api: AxiosInstance;

    constructor(api: AxiosInstance = defaultApi) {
        this._api = api;
    }

    async login(email: string, password: string){
        return await this._api.post('/login/', {email, password});
    }

}