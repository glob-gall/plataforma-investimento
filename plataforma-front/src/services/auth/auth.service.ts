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

    async register(email: string, name:string, password: string, birth:string){
        return await this._api.post('/register/', {email, name, password, birth});
    }
/*
        email = validated_data['email'],
        name = validated_data['name'],
        password = validated_data['password'],
        birth = validated_data['birth'],
        */
}