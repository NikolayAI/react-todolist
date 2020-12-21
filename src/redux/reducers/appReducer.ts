import { setIsLoggedIn } from './authReducer'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authAPI } from '../../api/authApi'
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError,
} from '../../utils/errorUtils'

const initializedApp = createAsyncThunk<undefined, undefined, { rejectValue: string }>(
    'app/initialize',
    async (param, { dispatch, rejectWithValue }) => {
        try {
            const data = await authAPI.me()
            if (!data.resultCode) {
                dispatch(setIsLoggedIn(true))
            } else {
                return handleAsyncServerAppError(data, dispatch, rejectWithValue)
            }
        } catch (error) {
            dispatch(appSlice.actions.setAppStatus('failed'))
            return handleAsyncServerNetworkError(error, dispatch, rejectWithValue)
        }
    }
)

const appSlice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        isInitialized: false,
    },
    reducers: {
        setAppStatus(state, action: PayloadAction<RequestStatusType>) {
            state.status = action.payload
        },
        setAppError(state, action: PayloadAction<string | null>) {
            state.error = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(initializedApp.fulfilled, (state) => {
            state.isInitialized = true
        })
    },
})

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const { setAppError, setAppStatus } = appSlice.actions
export const appReducer = appSlice.reducer
export { initializedApp, setAppError, setAppStatus }
