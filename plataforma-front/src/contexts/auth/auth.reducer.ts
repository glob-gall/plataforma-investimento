import {AuthActions, AuthContextStates} from "@contexts/auth/auth.types";

const INITIAL_VALUE = (user?: AuthContextStates['user']): AuthContextStates => ({
    token: '',
    user: user,
})

export const authReducer = (state: AuthContextStates, action: AuthActions) => {
    switch (action.type) {
        case 'GET/AUTH':
            return INITIAL_VALUE(action.payload)

        case 'SET/AUTH':
            return INITIAL_VALUE()

        case 'SAVE/USER':
            return INITIAL_VALUE(action.payload)

        default:
            return state
    }
}

export default INITIAL_VALUE