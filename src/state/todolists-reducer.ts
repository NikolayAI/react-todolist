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
    todolistId: string
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


export const todolistsReducer = (state: Array<TodoListType>, action: ActionsTypes): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            const changeTodolistTitle = state.find(tl => tl.id === action.id)
            if (changeTodolistTitle) changeTodolistTitle.title = action.title
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            const changeTodolistFilter = state.find(tl => tl.id === action.id)
            if (changeTodolistFilter) changeTodolistFilter.filter = action.filter
            return [...state]
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (todolistTitle: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: todolistTitle, todolistId: v1()}
}

export const changeTodolistTitleAC = (todolistId: string, newTitle: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: newTitle }
}

export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: newFilter}
}

