import { todolistsApi } from '../../api/todolistsApi'
import { RequestStatusType, setAppStatus } from './appReducer'
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError,
} from '../../utils/errorUtils'
import { TodolistType } from '../../api/api'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThunkErrorType } from '../../app/store'

const fetchTodoLists = createAsyncThunk<Array<TodolistType>, undefined, ThunkErrorType>(
    'todoList/fetchTodoLists',
    async (param, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setAppStatus('loading'))
            const data = await todolistsApi.getTodolists()
            dispatch(setAppStatus('succeeded'))
            return data
        } catch (error) {
            return handleAsyncServerNetworkError(error, dispatch, rejectWithValue, false)
        }
    }
)

const addTodo = createAsyncThunk<TodolistType, string, ThunkErrorType>(
    'todoList/addTodoLists',
    async (title, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setAppStatus('loading'))
            const data = await todolistsApi.createTodolist(title)
            if (!data.resultCode) {
                dispatch(setAppStatus('succeeded'))
                return data.data.item
            } else {
                return handleAsyncServerAppError(data, dispatch, rejectWithValue, false)
            }
        } catch (error) {
            return handleAsyncServerNetworkError(error, dispatch, rejectWithValue, false)
        }
    }
)

const removeTodo = createAsyncThunk<string, string, ThunkErrorType>(
    'todoList/removeTodoLists',
    async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setAppStatus('loading'))
            dispatch(
                changeTodolistEntityStatus({
                    todolistId,
                    newStatus: 'loading',
                })
            )
            const data = await todolistsApi.deleteTodolists(todolistId)
            if (!data.resultCode) {
                dispatch(setAppStatus('succeeded'))
                return todolistId
            } else {
                return handleAsyncServerAppError(data, dispatch, rejectWithValue)
            }
        } catch (error) {
            return handleAsyncServerNetworkError(error, dispatch, rejectWithValue, false)
        }
    }
)

const changeTodoTitle = createAsyncThunk<
    ChangeTodoParamType,
    ChangeTodoParamType,
    ThunkErrorType
>('todoList/changeTodoTitle', async (param, { dispatch, rejectWithValue }) => {
    const { todolistId, newTitle } = param
    try {
        const data = await todolistsApi.updateTodolist(todolistId, newTitle)
        if (!data.resultCode) {
            return { todolistId, newTitle }
        } else {
            return handleAsyncServerAppError(data, dispatch, rejectWithValue)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error, dispatch, rejectWithValue, false)
    }
})

const todoListSlice = createSlice({
    name: 'todoList',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilter(
            state,
            action: PayloadAction<{ todolistId: string; newFilter: FilterValuesType }>
        ) {
            const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
            state[index].filter = action.payload.newFilter
        },
        changeTodolistEntityStatus(
            state,
            action: PayloadAction<{ todolistId: string; newStatus: RequestStatusType }>
        ) {
            const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
            state[index].entityStatus = action.payload.newStatus
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodoLists.fulfilled, (state, action) => {
                return action.payload.map((tl) => ({
                    ...tl,
                    filter: 'all',
                    entityStatus: 'idle',
                }))
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.unshift({ ...action.payload, filter: 'all', entityStatus: 'idle' })
            })
            .addCase(removeTodo.fulfilled, (state, action) => {
                const index = state.findIndex((tl) => tl.id === action.payload)
                if (index > -1) state.splice(index, 1)
            })
            .addCase(changeTodoTitle.fulfilled, (state, action) => {
                const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
                state[index].title = action.payload.newTitle
            })
    },
})

type ChangeTodoParamType = {
    todolistId: string
    newTitle: string
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const { changeTodolistEntityStatus, changeTodolistFilter } = todoListSlice.actions
export const todoListsReducer = todoListSlice.reducer
export {
    fetchTodoLists,
    addTodo,
    removeTodo,
    changeTodoTitle,
    changeTodolistEntityStatus,
    changeTodolistFilter,
}
