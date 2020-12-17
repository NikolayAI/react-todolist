import { todolistsApi } from '../../api/todolistsApi'
import { Dispatch } from 'redux'
import { RequestStatusType, setAppStatus } from './appReducer'
import { handleServerNetworkError } from '../../utils/errorUtils'
import { TodolistType } from '../../api/api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const todoListSlice = createSlice({
    name: 'todoList',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        addTodolist: {
            reducer(state, action: PayloadAction<TodolistDomainType>) {
                state.unshift(action.payload)
            },
            prepare(todoList: TodolistType) {
                return {
                    payload: {
                        ...todoList,
                        filter: 'all' as FilterValuesType,
                        entityStatus: 'idle' as RequestStatusType,
                    },
                }
            },
        },
        removeTodolist(state, action: PayloadAction<string>) {
            const index = state.findIndex((tl) => tl.id === action.payload)
            if (index > -1) state.splice(index, 1)
        },
        changeTodolistTitle(
            state,
            action: PayloadAction<{ todolistId: string; newTitle: string }>
        ) {
            const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
            state[index].title = action.payload.newTitle
        },
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
        setTodolists(state, action: PayloadAction<Array<TodolistType>>) {
            return action.payload.map((tl) => ({
                ...tl,
                filter: 'all',
                entityStatus: 'idle',
            }))
        },
    },
})

export const fetchTodolists = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatus('loading'))
        const data = await todolistsApi.getTodolists()
        dispatch(setTodolists(data))
        dispatch(setAppStatus('succeeded'))
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

export const removeTodo = (todolistId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatus('loading'))
        dispatch(changeTodolistEntityStatus({ todolistId, newStatus: 'loading' }))
        const { resultCode } = await todolistsApi.deleteTodolists(todolistId)
        if (!resultCode) {
            dispatch(removeTodolist(todolistId))
            dispatch(setAppStatus('succeeded'))
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

export const addTodo = (title: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatus('loading'))
        const data = await todolistsApi.createTodolist(title)
        if (!data.resultCode) {
            dispatch(addTodolist(data.data.item))
            dispatch(setAppStatus('succeeded'))
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

export const changeTodoTitle = (todolistId: string, newTitle: string) => async (
    dispatch: Dispatch
) => {
    try {
        const { resultCode } = await todolistsApi.updateTodolist(todolistId, newTitle)
        if (!resultCode) {
            dispatch(changeTodolistTitle({ todolistId, newTitle }))
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const todoListsReducer = todoListSlice.reducer
export const {
    addTodolist,
    changeTodolistEntityStatus,
    changeTodolistFilter,
    changeTodolistTitle,
    removeTodolist,
    setTodolists,
} = todoListSlice.actions
