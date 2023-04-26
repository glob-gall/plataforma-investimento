import {Actions, ContextType} from "@contexts/context.types";

export interface User {
    id: string
    name: string
    email: string
    avatar?: string
    birth: string;
    is_active: boolean;
    is_email_verified: boolean;
}

export type ProviderProps = {
    children: React.ReactNode
    user?: User | null
}

export type AuthContextStates = {
    token: string;
    user?: User;
}

export interface AuthContextActions {
    login(email: string, password: string): Promise<void>
    logout(): Promise<void>
}

export interface AuthContextValues extends ContextType<AuthContextStates, AuthContextActions> {}

export enum AUTH_ACTIONS {
    GET_ACTION = 'GET/AUTH',
    SET_ACTION = 'SET/AUTH',
    SAVE_USER = 'SAVE/USER',
}

export type AuthActions = Actions<AUTH_ACTIONS>