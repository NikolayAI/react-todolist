import { Dispatch } from 'redux'
import { appActions } from './appReducer'
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

export const authActions = {
    setIsLoggedIn: (value: boolean) =>
        ({ type: 'todo/login/SET_IS_LOGGED_IN', payload: value } as const),
}

export const login = (loginData: LoginParamsType) => async (dispatch: Dispatch) => {
    try {
        dispatch(appActions.setAppStatus('loading'))
        const data = await authAPI.login(loginData)
        if (!data.resultCode) {
            dispatch(authActions.setIsLoggedIn(true))
            dispatch(appActions.setAppStatus('succeeded'))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

export const logout = () => async (dispatch: Dispatch) => {
    try {
        dispatch(appActions.setAppStatus('loading'))
        const data = await authAPI.logout()
        if (!data.resultCode) {
            dispatch(authActions.setIsLoggedIn(false))
            dispatch(appActions.setAppStatus('succeeded'))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof authActions>
