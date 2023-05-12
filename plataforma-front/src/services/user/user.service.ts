import {AxiosInstance} from "axios";
import defaultApi from "@config/api.config";
import { EditUserFormData } from "@/templates/profile/profile.types";

export class UserService {

    private _api: AxiosInstance;

    constructor(api: AxiosInstance = defaultApi) {
        this._api = api;
    }

    async get(){
        return await this._api.get('/usuario');
    }

    async put(data:EditUserFormData){
        return await this._api.put('/usuario/',data)
    }

}