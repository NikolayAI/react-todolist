import { Dispatch } from 'redux'
import { setAppStatus } from './appReducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/errorUtils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginParamsType } from '../../api/api'
import { authAPI } from '../../api/authApi'

const initialState = {
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload
        },
    },
})

export const login = (loginData: LoginParamsType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatus('loading'))
        const data = await authAPI.login(loginData)
        if (!data.resultCode) {
            dispatch(setIsLoggedIn(true))
            dispatch(setAppStatus('succeeded'))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

export const logout = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatus('loading'))
        const data = await authAPI.logout()
        if (!data.resultCode) {
            dispatch(setIsLoggedIn(false))
            dispatch(setAppStatus('succeeded'))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

export const authReducer = authSlice.reducer
export const { setIsLoggedIn } = authSlice.actions
