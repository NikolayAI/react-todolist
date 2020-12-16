import { Dispatch } from 'redux'
import { setIsLoggedIn } from './authReducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authAPI } from '../../api/authApi'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<RequestStatusType>) {
            state.status = action.payload
        },
        setAppError(state, action: PayloadAction<string | null>) {
            state.error = action.payload
        },
        setAppInitialized(state, action: PayloadAction<boolean>) {
            state.isInitialized = action.payload
        },
    },
})

export const initializedApp = () => async (dispatch: Dispatch) => {
    try {
        const { resultCode } = await authAPI.me()
        if (!resultCode) {
            dispatch(setIsLoggedIn(true))
        }
        dispatch(setAppInitialized(true))
    } catch (error) {
        dispatch(setAppError(error))
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const appReducer = appSlice.reducer
export const { setAppStatus, setAppError, setAppInitialized } = appSlice.actions
