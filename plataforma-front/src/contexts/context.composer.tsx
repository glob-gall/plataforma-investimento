import {ContextComposerProps} from "@contexts/context.types";
import {AuthProvider} from "@contexts/auth/auth.context";
import React from "react";
import { ErrorHandlerProvider } from "./errorsHandler/errorsHandler.context";

const ContextComposer: React.FC<ContextComposerProps> = ({
    children,
    user,
}) => {
    return (
        <>
            <AuthProvider user={user}>
                <ErrorHandlerProvider>
                    {children}
                </ErrorHandlerProvider>
            </AuthProvider>
        </>
    )
}

export default ContextComposer