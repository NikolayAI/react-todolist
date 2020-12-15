import { todolistsApi } from '../../api/todolistsApi'
import { Dispatch } from 'redux'
import { RequestStatusType, actions as appActions } from './appReducer'
import { handleServerNetworkError } from '../../utils/errorUtils'
import { TodolistType } from '../../api/api'

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type SetTodolistsActionType = {
    type: 'SET_TODOLISTS'
    todolists: Array<TodolistType>
}

export type ChangeTodolistEntityStatusActionType = {
    type: 'CHANGE-TODOLIST-ENTITY-STATUS'
    todolistId: string
    status: RequestStatusType
}

export type ActionsTypes =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType
    | ChangeTodolistEntityStatusActionType

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const todolistsReducer = (
    state = initialState,
    action: ActionsTypes
): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter((tl) => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodolist: TodolistDomainType = {
                ...action.todolist,
                filter: 'all',
                entityStatus: 'idle',
            }
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map((tl) =>
                tl.id === action.id ? { ...tl, title: action.title } : tl
            )
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((tl) =>
                tl.id === action.id ? { ...tl, filter: action.filter } : tl
            )
        case 'SET_TODOLISTS':
            return action.todolists.map((tl) => ({
                ...tl,
                filter: 'all',
                entityStatus: 'idle',
            }))
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map((tl) =>
                tl.id === action.todolistId ? { ...tl, entityStatus: action.status } : tl
            )
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId } as const
}

export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', todolist } as const
}

export const changeTodolistTitleAC = (
    todolistId: string,
    newTitle: string
): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId,
        title: newTitle,
    } as const
}

export const changeTodolistFilterAC = (
    todolistId: string,
    newFilter: FilterValuesType
): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId,
        filter: newFilter,
    } as const
}

export const setTodolistsAC = (
    todolists: Array<TodolistType>
): SetTodolistsActionType => {
    return { type: 'SET_TODOLISTS', todolists } as const
}

export const changeTodolistEntityStatusAC = (
    todolistId: string,
    status: RequestStatusType
): ChangeTodolistEntityStatusActionType => {
    return { type: 'CHANGE-TODOLIST-ENTITY-STATUS', todolistId, status } as const
}

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    todolistsApi
        .getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(appActions.setAppStatusAC('succeeded'))
        })
        .catch((error) => handleServerNetworkError(error, dispatch))
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistsApi.deleteTodolists(todolistId).then((res) => {
        if (!res.data.resultCode) {
            dispatch(removeTodolistAC(todolistId))
            dispatch(appActions.setAppStatusAC('succeeded'))
        }
    })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    todolistsApi.createTodolist(title).then((res) => {
        if (!res.data.resultCode) {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(appActions.setAppStatusAC('succeeded'))
        }
    })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (
    dispatch: Dispatch
) => {
    todolistsApi
        .updateTodolist(todolistId, title)
        .then(
            (res) =>
                !res.data.resultCode && dispatch(changeTodolistTitleAC(todolistId, title))
        )
}
