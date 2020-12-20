import { setAppStatus } from './appReducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/errorUtils'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FieldErrorType, LoginParamsType } from '../../api/api'
import { authAPI } from '../../api/authApi'
import { AxiosError } from 'axios'

const login = createAsyncThunk<
    undefined,
    LoginParamsType,
    { rejectValue: { errors: Array<string>; fieldsErrors?: Array<FieldErrorType> } }
>('auth/login', async (loginData, { dispatch, rejectWithValue }) => {
    try {
        dispatch(setAppStatus('loading'))
        const data = await authAPI.login(loginData)
        if (!data.resultCode) {
            dispatch(setAppStatus('succeeded'))
            return
        } else {
            handleServerAppError(data, dispatch)
            return rejectWithValue({
                errors: data.messages,
                fieldsErrors: data.fieldsErrors,
            })
        }
    } catch (err) {
        const error: AxiosError = err
        handleServerNetworkError(error, dispatch)
        return rejectWithValue({
            errors: [error.message],
            fieldsErrors: undefined,
        })
    }
})

const logout = createAsyncThunk(
    'auth/logout',
    async (param, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setAppStatus('loading'))
            const data = await authAPI.logout()
            if (!data.resultCode) {
                dispatch(setAppStatus('succeeded'))
                return
            } else {
                handleServerAppError(data, dispatch)
                return rejectWithValue({})
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue({})
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
