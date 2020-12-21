import { setAppStatus } from './appReducer'
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError,
} from '../../utils/errorUtils'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginParamsType } from '../../api/api'
import { authAPI } from '../../api/authApi'
import { ThunkErrorType } from '../store'

const login = createAsyncThunk<undefined, LoginParamsType, ThunkErrorType>(
    'auth/login',
    async (loginData, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setAppStatus('loading'))
            const data = await authAPI.login(loginData)
            if (!data.resultCode) {
                dispatch(setAppStatus('succeeded'))
                return
            } else {
                return handleAsyncServerAppError(data, dispatch, rejectWithValue)
            }
        } catch (error) {
            return handleAsyncServerNetworkError(error, dispatch, rejectWithValue)
        }
    }
)

const logout = createAsyncThunk<undefined, undefined, ThunkErrorType>(
    'auth/logout',
    async (param, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setAppStatus('loading'))
            const data = await authAPI.logout()
            if (!data.resultCode) {
                dispatch(setAppStatus('succeeded'))
            } else {
                return handleAsyncServerAppError(data, dispatch, rejectWithValue)
            }
        } catch (error) {
            return handleAsyncServerNetworkError(error, dispatch, rejectWithValue)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state) => {
                state.isLoggedIn = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false
            })
    },
})

const { setIsLoggedIn } = authSlice.actions
export const authReducer = authSlice.reducer
export { login, logout, setIsLoggedIn }
