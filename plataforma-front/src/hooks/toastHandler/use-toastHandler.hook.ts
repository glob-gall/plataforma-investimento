import { ToastHandlerContext } from "@/contexts/toastHandler/toastHandler.context";
import { ToastHandlerState } from "@/contexts/toastHandler/toastHandler.types";
import React from "react";

export function useToastHandler(): ToastHandlerState {
    const context = React.useContext(ToastHandlerContext)

    if (!context) {
        throw new Error('useToastHandler must be within its context')
    }

    return context
}