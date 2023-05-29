import {AUTH_ACTIONS, AuthContextValues, ProviderProps} from "@contexts/auth/auth.types";
import AUTH_INITIAL_VALUE,{authReducer} from "@contexts/auth/auth.reducer";
import {destroyCookie, setCookie} from "nookies";
import nookiesConfig from "@config/nookies.config";
import {TOKEN_KEY, USER_KEY} from "@constants/constants";
import {AuthService} from "@/services/auth/auth.service";
import { useRouter } from "next/router";
import React from "react";


export const AuthContext = React.createContext<AuthContextValues>({})
AuthContext.displayName = 'AuthContext'

export const AuthProvider: React.FC<ProviderProps> = ({ children, user }) => {

    const [state, dispatch] = React.useReducer(authReducer, AUTH_INITIAL_VALUE(user ?? undefined))
    const router = useRouter();
    const authService = new AuthService();

    async function login(email: string, password: string){
        const { data: { jwt, user } } = await authService.login(email, password);
        setCookie(null, TOKEN_KEY, jwt, nookiesConfig)
        setCookie(null, USER_KEY, JSON.stringify(user), nookiesConfig)
        dispatch({ type: AUTH_ACTIONS.SAVE_USER, payload: user })
        if(user.is_email_verified) {
            await router.replace('/dashboard')
            return
        }
        await router.replace('/login')
    }

    async function logout(){
        destroyCookie(null, TOKEN_KEY, { path: '/' })
        destroyCookie(null, USER_KEY, { path: '/' })
        await router.push('/login');
    }

    const actions = {
        login,
        logout
    }

    return <AuthContext.Provider value={{...state, actions}}>{children}</AuthContext.Provider>
}