import {ContextComposerProps} from "@contexts/context.types";
import {AuthProvider} from "@contexts/auth/auth.context";
import React from "react";
import { ToastHandlerProvider } from "./toastHandler/toastHandler.context";

const ContextComposer: React.FC<ContextComposerProps> = ({
    children,
    user,
}) => {
    return (
        <>
            <AuthProvider user={user}>
                <ToastHandlerProvider>
                    {children}
                </ToastHandlerProvider>
            </AuthProvider>
        </>
    )
}

export default ContextComposer