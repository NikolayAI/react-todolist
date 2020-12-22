import { todolistsApi } from '../../api/todolistsApi'
import { setAppStatus } from './appReducer'
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError,
} from '../../utils/errorUtils'
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    UpdateTaskModelType,
} from '../../api/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addTodo, fetchTodoLists, removeTodo } from './todoListsReducer'
import { RootStateType } from './rootReducer'
import { ThunkErrorType } from '../../app/store'

const fetchTasks = createAsyncThunk<
    { tasks: TaskType[]; todolistId: string },
    string,
    ThunkErrorType
>('tasks/fetchTasks', async (todolistId, { dispatch, rejectWithValue }) => {
    try {
        dispatch(setAppStatus('loading'))
        const data = await todolistsApi.getTasks(todolistId)
        dispatch(setAppStatus('succeeded'))
        return { tasks: data.items, todolistId }
    } catch (error) {
        return handleAsyncServerNetworkError(error, dispatch, rejectWithValue)
    }
})

const removeTasks = createAsyncThunk<
    RemoveTaskParamType,
    RemoveTaskParamType,
    ThunkErrorType
>('tasks/removeTasks', async (param, { dispatch, rejectWithValue }) => {
    const { todolistId, taskId } = param
    try {
        dispatch(setAppStatus('loading'))
        const data = await todolistsApi.deleteTask(todolistId, taskId)
        if (!data.resultCode) {
            dispatch(setAppStatus('succeeded'))
            return { todolistId, taskId }
        } else {
            return handleAsyncServerAppError(data, dispatch, rejectWithValue, false)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error, dispatch, rejectWithValue, false)
    }
})

const addTasks = createAsyncThunk<
    TaskType,
    { todolistId: string; title: string },
    ThunkErrorType
>('tasks/addTasks', async (param, { dispatch, rejectWithValue }) => {
    const { todolistId, title } = param
    try {
        dispatch(setAppStatus('loading'))
        const data = await todolistsApi.createTask(todolistId, title)
        if (!data.resultCode) {
            dispatch(setAppStatus('succeeded'))
            return data.data.item
        } else {
            return handleAsyncServerAppError(data, dispatch, rejectWithValue, false)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error, dispatch, rejectWithValue, false)
    }
})

const updateTasks = createAsyncThunk<
    updateTasksParamType,
    updateTasksParamType,
    ThunkErrorType
>('tasks/updateTask', async (param, { dispatch, getState, rejectWithValue }) => {
    const { todolistId, todolistTaskId, model } = param
    const state = getState() as RootStateType
    const task = state.tasks[todolistId].find((t) => t.id === todolistTaskId)

    if (!task) {
        return rejectWithValue({
            errors: ['task not found in the reducer'],
            fieldsErrors: undefined,
        })
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
            return param
        } else {
            return handleAsyncServerAppError(data, dispatch, rejectWithValue, false)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error, dispatch, rejectWithValue, false)
    }
})

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTodo.fulfilled, (state, action) => {
                state[action.payload.id] = []
            })
            .addCase(removeTodo.fulfilled, (state, action) => {
                delete state[action.payload]
            })
            .addCase(fetchTodoLists.fulfilled, (state, action) => {
                action.payload.forEach((tl) => (state[tl.id] = []))
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
                setAppStatus('succeeded')
            })
            .addCase(removeTasks.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex((t) => t.id === action.payload.taskId)
                if (index > -1) tasks.splice(index, 1)
            })
            .addCase(addTasks.fulfilled, (state, action) => {
                state[action.payload.todoListId].unshift(action.payload)
            })
            .addCase(updateTasks.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(
                    (t) => t.id === action.payload.todolistTaskId
                )
                if (index > -1)
                    tasks[index] = { ...tasks[index], ...action.payload.model }
            })
    },
})

type updateTasksParamType = {
    todolistId: string
    todolistTaskId: string
    model: UpdateDomainTaskModelType
}

type RemoveTaskParamType = {
    todolistId: string
    taskId: string
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
export { fetchTasks, removeTasks, addTasks, updateTasks }
