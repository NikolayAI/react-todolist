import { RootStateType } from '../reducers/roootReducer'

export const statusSelector = (state: RootStateType) => state.app.status
export const errorSelector = (state: RootStateType) => state.app.error
export const initializedSelector = (state: RootStateType) => state.app.isInitialized
