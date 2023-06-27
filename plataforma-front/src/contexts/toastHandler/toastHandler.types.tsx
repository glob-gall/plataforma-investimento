import React from "react"

export type ProviderProps = {
    children: React.ReactNode
}

export interface Message {
    type: 'success' | 'info' | 'warning' | 'error'
    message:string
}


export interface ToastHandlerContextStates {
    messages:Message[]
}
 

export interface ToastHandlerContextActions {
    handleSetSuccess(toast:any):void
    handleSetErrors(toast:any):void
    handleSetMessage(toast:Message):void
    clearToasts(index:number):void
}

export interface ToastHandlerState extends ToastHandlerContextStates,ToastHandlerContextActions{}