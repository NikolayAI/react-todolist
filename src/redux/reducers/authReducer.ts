import { Dispatch } from 'redux'
import { actions as appActions } from './appReducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/errorUtils'
import { createSlice } from '@reduxjs/toolkit'
import { InferActionsTypes } from './roootReducer'
import { LoginParamsType } from '../../api/api'
import { authAPI } from '../../api/authApi'

const initialState = {
    isLoggedIn: false,
}

const authSlice = createSlice

export const authReducer = (
    state = initialState,
    action: ActionsType
): initialStateType => {
    switch (action.type) {
        case 'todo/login/SET_IS_LOGGED_IN':
            return { ...state, isLoggedIn: action.payload }
        default:
            return state
    }
}

export const actions = {
    setIsLoggedInAC: (value: boolean) =>
        ({ type: 'todo/login/SET_IS_LOGGED_IN', payload: value } as const),
}

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    authAPI
        .login(data)
        .then((data) => {
            if (!data.resultCode) {
                dispatch(actions.setIsLoggedInAC(true))
                dispatch(appActions.setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(data, dispatch)
            }
        })
        .catch((error) => handleServerNetworkError(error, dispatch))
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    authAPI
        .logout()
        .then((data) => {
            if (!data.resultCode) {
                dispatch(actions.setIsLoggedInAC(false))
                dispatch(appActions.setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(data, dispatch)
            }
        })
        .catch((error) => handleServerNetworkError(error, dispatch))
}

type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
