import { Dispatch } from 'redux'
import { actions as authActions } from './authReducer'
import { createSlice } from '@reduxjs/toolkit'
import { InferActionsTypes } from './roootReducer'
import { authAPI } from '../../api/authApi'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
}

const appSlice = createSlice

export const appReducer = (
    state = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case 'todo/app/SET_STATUS':
            return { ...state, status: action.payload }
        case 'todo/app/SET_ERROR':
            return { ...state, error: action.payload }
        case 'todo/app/SET_IS_INITIALIZED':
            return { ...state, isInitialized: action.payload }
        default:
            return state
    }
}

export const actions = {
    setAppStatusAC: (status: RequestStatusType) =>
        ({ type: 'todo/app/SET_STATUS', payload: status } as const),
    setAppErrorAC: (error: string | null) =>
        ({ type: 'todo/app/SET_ERROR', payload: error } as const),
    setAppInitializedAC: (value: boolean) =>
        ({ type: 'todo/app/SET_IS_INITIALIZED', payload: value } as const),
}

export const initializedAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then((data) => {
        if (!data.resultCode) {
            dispatch(authActions.setIsLoggedInAC(true))
        }
        dispatch(actions.setAppInitializedAC(true))
    })
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
