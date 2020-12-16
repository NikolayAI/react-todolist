import { todolistsApi } from '../../api/todolistsApi'
import { Dispatch } from 'redux'
import { setAppStatus } from './appReducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/errorUtils'
import { RootStateType } from './roootReducer'
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    UpdateTaskModelType,
} from '../../api/api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addTodolist, removeTodolist, setTodolists } from './todoListsReducer'

const initialState: TasksStateType = {}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<TaskType>) {
            state[action.payload.todoListId].unshift(action.payload)
        },
        removeTask(state, action: PayloadAction<{ todolistId: string; taskId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((t) => t.id === action.payload.taskId)
            if (index > -1) tasks.splice(index, 1)
        },
        updateTask(
            state,
            action: PayloadAction<{
                todolistId: string
                todolistTaskId: string
                model: UpdateDomainTaskModelType
            }>
        ) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((t) => t.id === action.payload.todolistTaskId)
            if (index > -1) tasks[index] = { ...tasks[index], ...action.payload.model }
        },
        setTasks(
            state,
            action: PayloadAction<{ tasks: Array<TaskType>; todolistId: string }>
        ) {
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(addTodolist, (state, action) => {
                state[action.payload.id] = []
            })
            .addCase(removeTodolist, (state, action) => {
                delete state[action.payload]
            })
            .addCase(setTodolists, (state, action) => {
                action.payload.forEach((tl) => (state[tl.id] = []))
            }),
})

export const fetchTasks = (todolistId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatus('loading'))
        const { items } = await todolistsApi.getTasks(todolistId)
        dispatch(setTasks({ tasks: items, todolistId }))
        dispatch(setAppStatus('succeeded'))
    } catch (error) {
        console.log(error)
    }
}

export const removeTasks = (todolistId: string, taskId: string) => async (
    dispatch: Dispatch
) => {
    try {
        const { resultCode } = await todolistsApi.deleteTask(todolistId, taskId)
        !resultCode && dispatch(removeTask({ todolistId, taskId }))
    } catch (error) {
        console.log(error)
    }
}

export const addTasks = (todolistId: string, title: string) => async (
    dispatch: Dispatch
) => {
    try {
        dispatch(setAppStatus('loading'))
        const data = await todolistsApi.createTask(todolistId, title)
        if (!data.resultCode) {
            dispatch(addTask(data.data.item))
            dispatch(setAppStatus('succeeded'))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

export const updateTasks = (
    todolistId: string,
    todolistTaskId: string,
    model: UpdateDomainTaskModelType
) => async (dispatch: Dispatch, getState: () => RootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find((t) => t.id === todolistTaskId)
    if (!task) {
        console.warn('task not found in the reducers')
        return
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        status: task.status,
        startDate: task.startDate,
        description: task.description,
        priority: task.priority,
        deadline: task.deadline,
        ...model,
    }
    const data = await todolistsApi.updateTask(todolistId, todolistTaskId, apiModel)
    try {
        if (!data.resultCode) {
            dispatch(updateTask({ todolistId, todolistTaskId, model }))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = { [key: string]: TaskType[] }

export const tasksReducer = tasksSlice.reducer
export const { addTask, removeTask, setTasks, updateTask } = tasksSlice.actions
