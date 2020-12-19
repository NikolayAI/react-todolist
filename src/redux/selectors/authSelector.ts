import { RootStateType } from '../reducers/roootReducer'

export const isLoggedInSelector = (state: RootStateType) => state.auth.isLoggedIn
