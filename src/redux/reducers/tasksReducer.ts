import { todolistsApi } from '../../api/todolistsApi'
import { setAppStatus } from './appReducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/errorUtils'
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    UpdateTaskModelType,
} from '../../api/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addTodo, fetchTodoLists, removeTodo } from './todoListsReducer'
import { RootStateType } from './roootReducer'

const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (todolistId: string, { dispatch }) => {
        try {
            dispatch(setAppStatus('loading'))
            const { items } = await todolistsApi.getTasks(todolistId)
            dispatch(setAppStatus('succeeded'))
            return { tasks: items, todolistId }
        } catch (error) {
            console.log(error)
            return error
        }
    }
)

const removeTasks = createAsyncThunk(
    'tasks/removeTasks',
    async (param: { todolistId: string; taskId: string }) => {
        const { todolistId, taskId } = param
        try {
            const { resultCode } = await todolistsApi.deleteTask(todolistId, taskId)
            if (!resultCode) {
                return { todolistId, taskId }
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }
)

const addTasks = createAsyncThunk(
    'tasks/addTasks',
    async (
        param: { todolistId: string; title: string },
        { dispatch, rejectWithValue }
    ) => {
        const { todolistId, title } = param
        try {
            dispatch(setAppStatus('loading'))
            const data = await todolistsApi.createTask(todolistId, title)
            if (!data.resultCode) {
                dispatch(setAppStatus('succeeded'))
                return data.data.item
            } else {
                handleServerAppError(data, dispatch)
                return rejectWithValue(null)
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    }
)

const updateTasks = createAsyncThunk(
    'tasks/updateTask',
    async (
        param: {
            todolistId: string
            todolistTaskId: string
            model: UpdateDomainTaskModelType
        },
        { dispatch, getState, rejectWithValue }
    ) => {
        const { todolistId, todolistTaskId, model } = param
        const state = getState() as RootStateType
        const task = state.tasks[todolistId].find((t) => t.id === todolistTaskId)

        if (!task) {
            return rejectWithValue('task not found in the reducers')
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
                handleServerAppError(data, dispatch)
                return rejectWithValue(null)
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    }
)

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
