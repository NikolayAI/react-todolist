import { rootReducer } from './reducers/roootReducer'
import {
    ActionCreatorsMapObject,
    bindActionCreators,
    configureStore,
} from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { useMemo } from 'react'

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useActions = <T extends ActionCreatorsMapObject<any>>(actions: T) => {
    const dispatch = useAppDispatch()

    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [actions, dispatch])

    return boundActions
}
