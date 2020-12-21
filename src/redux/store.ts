import { rootReducer } from './reducers/roootReducer'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { FieldErrorType } from '../api/api'

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type ThunkErrorType = {
    rejectValue: {
        errors: Array<string>
        fieldsErrors?: Array<FieldErrorType>
    }
}
