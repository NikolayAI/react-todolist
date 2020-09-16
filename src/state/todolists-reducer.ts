import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}


export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
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

type ActionsTypes = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


export const todolistsReducer = (state: Array<TodoListType>, action: ActionsTypes) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            let changeTodolistTitle = state.find(tl => tl.id === action.id)
            if (changeTodolistTitle) changeTodolistTitle.title = action.title
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            let changeTodolistFilter = state.find(tl => tl.id === action.id)
            if (changeTodolistFilter) changeTodolistFilter.filter = action.filter
            return [...state]
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAC = (todolistTitle: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: todolistTitle}
}

export const ChangeTodolistTitleAC = (todolistId: string, newTitle: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: newTitle }
}

export const ChangeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: newFilter}
}

