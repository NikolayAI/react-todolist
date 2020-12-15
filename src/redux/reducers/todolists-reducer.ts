import { todolistsApi } from '../../api/todolistsApi'
import { Dispatch } from 'redux'
import { appActions, RequestStatusType } from './appReducer'
import { handleServerNetworkError } from '../../utils/errorUtils'
import { TodolistType } from '../../api/api'
import { InferActionsTypes } from './roootReducer'

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (
    state = initialState,
    action: ActionsType
): initialStateType => {
    switch (action.type) {
        case 'todo/todolists/REMOVE_TODOLIST':
            return state.filter((tl) => tl.id !== action.payload)
        case 'todo/todolists/ADD_TODOLIST':
            const newTodolist: TodolistDomainType = {
                ...action.payload,
                filter: 'all',
                entityStatus: 'idle',
            }
            return [newTodolist, ...state]
        case 'todo/todolists/CHANGE_TODOLIST_TITLE':
            return state.map((tl) =>
                tl.id === action.payload.todolistId
                    ? { ...tl, title: action.payload.newTitle }
                    : tl
            )
        case 'todo/todolists/CHANGE_TODOLIST_FILTER':
            return state.map((tl) =>
                tl.id === action.payload.todolistId
                    ? { ...tl, filter: action.payload.newFilter }
                    : tl
            )
        case 'todo/todolists/SET_TODOLISTS':
            return action.payload.map((tl) => ({
                ...tl,
                filter: 'all',
                entityStatus: 'idle',
            }))
        case 'todo/todolists/CHANGE_TODOLIST_ENTITY_STATUS':
            return state.map((tl) =>
                tl.id === action.payload.todolistId
                    ? { ...tl, entityStatus: action.payload.status }
                    : tl
            )
        default:
            return state
    }
}

export const todolistActions = {
    removeTodolist: (todolistId: string) =>
        ({ type: 'todo/todolists/REMOVE_TODOLIST', payload: todolistId } as const),

    addTodolist: (todolist: TodolistType) =>
        ({ type: 'todo/todolists/ADD_TODOLIST', payload: todolist } as const),

    changeTodolistTitle: (todolistId: string, newTitle: string) =>
        ({
            type: 'todo/todolists/CHANGE_TODOLIST_TITLE',
            payload: { todolistId, newTitle },
        } as const),

    changeTodolistFilter: (todolistId: string, newFilter: FilterValuesType) =>
        ({
            type: 'todo/todolists/CHANGE_TODOLIST_FILTER',
            payload: { todolistId, newFilter },
        } as const),

    setTodolists: (todolists: Array<TodolistType>) =>
        ({ type: 'todo/todolists/SET_TODOLISTS', payload: todolists } as const),

    changeTodolistEntityStatus: (todolistId: string, status: RequestStatusType) =>
        ({
            type: 'todo/todolists/CHANGE_TODOLIST_ENTITY_STATUS',
            payload: { todolistId, status },
        } as const),
}

export const fetchTodolists = () => async (dispatch: Dispatch) => {
    try {
        dispatch(appActions.setAppStatus('loading'))
        const data = await todolistsApi.getTodolists()
        dispatch(todolistActions.setTodolists(data))
        dispatch(appActions.setAppStatus('succeeded'))
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

export const removeTodolist = (todolistId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(appActions.setAppStatus('loading'))
        dispatch(todolistActions.changeTodolistEntityStatus(todolistId, 'loading'))
        const { resultCode } = await todolistsApi.deleteTodolists(todolistId)
        if (!resultCode) {
            dispatch(todolistActions.removeTodolist(todolistId))
            dispatch(appActions.setAppStatus('succeeded'))
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

export const addTodolist = (title: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(appActions.setAppStatus('loading'))
        const data = await todolistsApi.createTodolist(title)
        if (!data.resultCode) {
            dispatch(todolistActions.addTodolist(data.data.item))
            dispatch(appActions.setAppStatus('succeeded'))
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

export const changeTodolistTitle = (todolistId: string, title: string) => async (
    dispatch: Dispatch
) => {
    try {
        const { resultCode } = await todolistsApi.updateTodolist(todolistId, title)
        if (!resultCode) {
            dispatch(todolistActions.changeTodolistTitle(todolistId, title))
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

type initialStateType = typeof initialState
export type ActionsType = InferActionsTypes<typeof todolistActions>
