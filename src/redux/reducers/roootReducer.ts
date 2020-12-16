import { combineReducers } from 'redux'
import { todoListsReducer } from './todoListsReducer'
import { tasksReducer } from './tasksReducer'
import { appReducer } from './appReducer'
import { authReducer } from './authReducer'

export const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
})

export type RootStateType = ReturnType<typeof rootReducer>
