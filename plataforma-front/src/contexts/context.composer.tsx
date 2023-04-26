import {ContextComposerProps} from "@contexts/context.types";
import {AuthProvider} from "@contexts/auth/auth.context";
import React from "react";

const ContextComposer: React.FC<ContextComposerProps> = ({
    children,
    user,
}) => {
    return (
        <>
            <AuthProvider user={user}>
                {children}
            </AuthProvider>
        </>
    )
}

export default ContextComposer