import React from "react"

export type ProviderProps = {
    children: React.ReactNode
}

export interface Message {
    message:string
}
export interface Error {
    errors:Message[]
}

export interface ErrorHandlerContextStates {
    error:Error
}

export interface ErrorHandlerContextActions {
    handleSetErrors(error:Error):void
    clearErrors(index:number):void
}

export interface ErrorHandlerState extends ErrorHandlerContextStates,ErrorHandlerContextActions{}