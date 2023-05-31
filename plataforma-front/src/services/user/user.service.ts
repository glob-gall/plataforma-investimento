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
        const formData = new FormData();
        for (const key in data) {
            formData.append(key,data[key])
        }
        data.avatar ? formData.append('avatar',data.avatar[0]) : null
        console.log(formData)
        return await this._api.put('/usuario/',formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    }

    async recoverPassword(email:string){
        return await this._api.post('/usuario/resetpassword/',{email})

    }

    async recoverPasswordConfirm(data:any){
        return await this._api.post('/usuario/resetpasswordconfirm/',data)

    }

}