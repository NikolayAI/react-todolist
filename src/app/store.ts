import { rootReducer } from '../redux/reducers/rootReducer'
import { configureStore } from '@reduxjs/toolkit'
import { FieldErrorType } from '../api/api'
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

if (module.hot) {
    module.hot.accept('../redux/reducers/rootReducer', () =>
        store.replaceReducer(rootReducer)
    )
}

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type ThunkErrorType = {
    rejectValue: {
        errors: Array<string>
        fieldsErrors?: Array<FieldErrorType>
    }
}
