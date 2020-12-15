import { RootStateType } from '../reducers/roootReducer'

export const getStatus = (state: RootStateType) => state.app.status
export const getError = (state: RootStateType) => state.app.error
export const getInitialized = (state: RootStateType) => state.app.isInitialized
