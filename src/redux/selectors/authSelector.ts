import { RootStateType } from '../reducers/rootReducer'

export const selectIsLoggedIn = (state: RootStateType) => state.auth.isLoggedIn
