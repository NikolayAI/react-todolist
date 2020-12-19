import { todolistsApi } from '../../api/todolistsApi'
import { RequestStatusType, setAppStatus } from './appReducer'
import { handleServerNetworkError } from '../../utils/errorUtils'
import { TodolistType } from '../../api/api'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export const fetchTodoLists = createAsyncThunk(
    'todoList/fetchTodoLists',
    async (param, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setAppStatus('loading'))
            const data = await todolistsApi.getTodolists()
            dispatch(setAppStatus('succeeded'))
            return data
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    }
)

export const addTodo = createAsyncThunk(
    'todoList/addTodoLists',
    async (title: string, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setAppStatus('loading'))
            const data = await todolistsApi.createTodolist(title)
            if (!data.resultCode) {
                dispatch(setAppStatus('succeeded'))
                return data.data.item
            } else {
                return rejectWithValue(null)
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    }
)

export const removeTodo = createAsyncThunk(
    'todoList/removeTodoLists',
    async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setAppStatus('loading'))
            dispatch(
                todoActions.changeTodolistEntityStatus({
                    todolistId,
                    newStatus: 'loading',
                })
            )
            const { resultCode } = await todolistsApi.deleteTodolists(todolistId)
            if (!resultCode) {
                dispatch(setAppStatus('succeeded'))
                return todolistId
            } else {
                return rejectWithValue(null)
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    }
)

export const changeTodoTitle = createAsyncThunk(
    'todoList/changeTodoTitle',
    async (
        param: { todolistId: string; newTitle: string },
        { dispatch, rejectWithValue }
    ) => {
        const { todolistId, newTitle } = param
        try {
            const data = await todolistsApi.updateTodolist(todolistId, newTitle)
            if (!data.resultCode) {
                return { todolistId, newTitle }
            } else {
                return rejectWithValue(null)
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    }
)

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

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const todoListsReducer = todoListSlice.reducer
export const todoActions = {
    fetchTodoLists,
    addTodo,
    removeTodo,
    changeTodoTitle,
    changeTodolistEntityStatus: todoListSlice.actions.changeTodolistEntityStatus,
    changeTodolistFilter: todoListSlice.actions.changeTodolistFilter,
}
