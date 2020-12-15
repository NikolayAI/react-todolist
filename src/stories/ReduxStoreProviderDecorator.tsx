import React from 'react'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { tasksReducer } from '../redux/reducers/tasks-reducer'
import { todolistsReducer } from '../redux/reducers/todolists-reducer'
import { v1 } from 'uuid'
import { Provider } from 'react-redux'
import { appReducer } from '../redux/reducers/appReducer'
import thunkMiddleware from 'redux-thunk'
import { authReducer } from '../redux/reducers/authReducer'
import { TaskStatuses } from '../api/api'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

type AppRootStateType = ReturnType<typeof rootReducer>

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {
            id: 'todolistId1',
            title: 'What to learn',
            filter: 'all',
            addedDate: '',
            order: 0,
            entityStatus: 'idle',
        },
        {
            id: 'todolistId2',
            title: 'What to buy',
            filter: 'all',
            addedDate: '',
            order: 0,
            entityStatus: 'loading',
        },
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
            },
        ],
        ['todolistId2']: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
            },
            {
                id: v1(),
                title: 'React Book',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
            },
        ],
    },
    app: {
        status: 'idle',
        error: null,
        isInitialized: false,
    },
    auth: {
        isLoggedIn: false,
    },
}

export const storyBookStore = createStore(
    rootReducer,
    initialGlobalState,
    applyMiddleware(thunkMiddleware)
)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
