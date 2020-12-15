import { combineReducers } from 'redux'
import { todolistsReducer } from './todolists-reducer'
import { tasksReducer } from './tasks-reducer'
import { appReducer } from './appReducer'
import { authReducer } from './authReducer'

export const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
})

export type RootStateType = ReturnType<typeof rootReducer>

export type InferActionsTypes<T> = T extends {
    [key: string]: (...args: Array<any>) => infer U
}
    ? U
    : never
