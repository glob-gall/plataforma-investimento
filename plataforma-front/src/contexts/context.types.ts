import {User} from "@contexts/auth/auth.types";

export interface ContextComposerProps {
    children: any
    user?: User
    defaultTheme?: string
}

export type Actions<T> = {
    readonly type: T
    readonly payload?: never
}

export type ContextType<T, P> = Partial<T> & {
    actions?: P
}