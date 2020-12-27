import { RootStateType } from '../reducers/rootReducer'

export const selectStatus = (state: RootStateType) => state.app.status
export const selectError = (state: RootStateType) => state.app.error
export const selectInitialized = (state: RootStateType) => state.app.isInitialized
