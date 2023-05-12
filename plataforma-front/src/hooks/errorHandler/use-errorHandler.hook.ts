import { ErrorHandlerContext } from "@/contexts/errorsHandler/errorsHandler.context";
import { ErrorHandlerState } from "@/contexts/errorsHandler/errorsHandler.types";
import React from "react";

export function useErrorHandler(): ErrorHandlerState {
    const context = React.useContext(ErrorHandlerContext)

    if (!context) {
        throw new Error('useErrorHandler must be within its context')
    }

    return context
}