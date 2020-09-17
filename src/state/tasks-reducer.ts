import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTasksActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}


export type AddTasksActionType = {
    type: 'ADD-TASK'
    todolistTaskTitle: string
    todolistId: string
}

export type ChangeTaskStatusAC = {
    type: 'CHANGE-TASK-STATUS'
    todolistTaskId: string
    todolistId: string
    isDone: boolean
}

export type ChangeTaskTitleAC = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    todolistTaskId: string
    taskTitle: string
}

type ActionsTypes = RemoveTasksActionType
    | AddTasksActionType
    | ChangeTaskStatusAC
    | ChangeTaskTitleAC
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            const removeTasks = state[action.todolistId].filter(t => t.id !== action.taskId)
            return {...state, [action.todolistId]: removeTasks}
        case 'ADD-TASK':
            const newTask = {id: v1(), title: action.todolistTaskTitle, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case 'CHANGE-TASK-STATUS':
            const changeTaskStatusState = {...state}
            const changeStatusTask = changeTaskStatusState[action.todolistId].find(t => t.id === action.todolistTaskId)
            if (changeStatusTask) changeStatusTask.isDone = false
            return changeTaskStatusState
        case 'CHANGE-TASK-TITLE':
            const changeTaskTitleState = {...state}
            const changeTitleTask = changeTaskTitleState[action.todolistId].find(t => t.id === action.todolistTaskId)
            if (changeTitleTask) changeTitleTask.title = action.taskTitle
            return changeTaskTitleState
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'REMOVE-TODOLIST':
            const removeTodolistState = {...state}
            delete removeTodolistState[action.id]
            return removeTodolistState
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTasksActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}

export const addTaskAC = (todolistTaskTitle: string, todolistId: string): AddTasksActionType => {
    return {type: 'ADD-TASK', todolistTaskTitle, todolistId}
}

export const changeTaskStatusAC = (todolistTaskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusAC => {
    return {type: 'CHANGE-TASK-STATUS', todolistTaskId, isDone, todolistId}
}

export const changeTaskTitleAC = (todolistId: string, todolistTaskId: string, taskTitle: string): ChangeTaskTitleAC => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, todolistTaskId, taskTitle}
}