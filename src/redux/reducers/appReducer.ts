import { setIsLoggedIn } from './authReducer'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authAPI } from '../../api/authApi'

const initializedApp = createAsyncThunk<undefined, undefined, { rejectValue: string }>(
    'app/initialize',
    async (param, { dispatch, rejectWithValue }) => {
        try {
            const { resultCode } = await authAPI.me()
            if (!resultCode) {
                dispatch(setIsLoggedIn(true))
            }
            return
        } catch (error) {
            dispatch(appSlice.actions.setAppStatus(error))
            return rejectWithValue('Some Error')
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
