import { rootReducer } from './reducers/roootReducer'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})
