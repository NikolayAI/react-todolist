import { RootStateType } from '../reducers/rootReducer'

export const isLoggedInSelector = (state: RootStateType) => state.auth.isLoggedIn
