import { RootStateType } from '../reducers/roootReducer'

export const getIsLoggedIn = (state: RootStateType) => state.auth.isLoggedIn
