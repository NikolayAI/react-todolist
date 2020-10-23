import React from "react"
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from '../state/tasks-reducer'
import {todolistsReducer} from '../state/todolists-reducer'
import {v1} from 'uuid'
import {Provider} from "react-redux";
import {TaskStatuses} from "../api/todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})

type AppRootStateType = ReturnType<typeof rootReducer>

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',},
            {id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',}
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',},
            {
                id: v1(),
                title: "React Book",
                status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
