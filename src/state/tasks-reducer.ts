import {FilterValuesType, TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}

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

type ActionsTypes = RemoveTasksActionType
    | AddTasksActionType
    | ChangeTaskStatusAC

export const tasksReducer = (state: TasksStateType, action: ActionsTypes) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId)
            return stateCopy
        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.todolistTaskTitle, isDone: false}
            let copyState = state
            let todolisttask = copyState[action.todolistId]
            todolisttask = [newTask, ...todolisttask]
            return {...copyState, [action.todolistId]: todolisttask}
        case 'CHANGE-TASK-STATUS':
            let stCopy = {...state}
            let task = stCopy[action.todolistId].find(t => t.id === action.todolistTaskId)
            if (task) task.isDone = false
            return {...state}
        default:
            throw new Error("I don't understand this type")
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

