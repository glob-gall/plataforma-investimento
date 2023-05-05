import {AuthContextValues} from "@contexts/auth/auth.types";
import {AuthContext} from "@contexts/auth/auth.context";
import React from "react";

export function useAuth(): AuthContextValues {
    const context = React.useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be within its context')
    }

    return context
}