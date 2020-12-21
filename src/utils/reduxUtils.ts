import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useAppDispatch } from '../redux/store'

export const useActions = <T extends ActionCreatorsMapObject<any>>(actions: T) => {
    const dispatch = useAppDispatch()

    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [actions, dispatch])

    return boundActions
}
