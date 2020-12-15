import { todolistsApi } from '../../api/todolistsApi'
import { Dispatch } from 'redux'
import { appActions } from './appReducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/errorUtils'
import { InferActionsTypes, RootStateType } from './roootReducer'
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    UpdateTaskModelType,
} from '../../api/api'
import { ActionsType as TodolistActionsType } from './todolists-reducer'

const initialState: TasksStateType = {}

export const tasksReducer = (
    state = initialState,
    action: ActionsType | TodolistActionsType
): initialStateType => {
    switch (action.type) {
        case 'todo/tasks/REMOVE_TASK':
            const removeTasks = state[action.payload.todolistId].filter(
                (t) => t.id !== action.payload.taskId
            )
            return { ...state, [action.payload.todolistId]: removeTasks }
        case 'todo/tasks/ADD_TASK':
            const newTask: TaskType = action.payload
            return {
                ...state,
                [newTask.todoListId]: [newTask, ...state[newTask.todoListId]],
            }
        case 'todo/tasks/UPDATE_TASK':
            const changeTaskStatusState = state[action.payload.todolistId]
            state[action.payload.todolistId] = changeTaskStatusState.map((t) =>
                t.id === action.payload.todolistTaskId
                    ? { ...t, ...action.payload.model }
                    : t
            )
            return { ...state }
        case 'todo/todolists/ADD_TODOLIST':
            return { ...state, [action.payload.id]: [] }
        case 'todo/todolists/REMOVE_TODOLIST':
            const removeTodolistState = { ...state }
            delete removeTodolistState[action.payload]
            return removeTodolistState
        case 'todo/todolists/SET_TODOLISTS':
            const setTodolistsState = { ...state }
            action.payload.forEach((tl) => {
                setTodolistsState[tl.id] = []
            })
            return setTodolistsState
        case 'todo/tasks/SET_TASKS':
            const setTasksState = { ...state }
            setTasksState[action.payload.todolistId] = action.payload.tasks
            return setTasksState
        default:
            return state
    }
}

export const tasksActions = {
    addTask: (task: TaskType) =>
        ({ type: 'todo/tasks/ADD_TASK', payload: task } as const),

    setTasks: (tasks: Array<TaskType>, todolistId: string) =>
        ({ type: 'todo/tasks/SET_TASKS', payload: { tasks, todolistId } } as const),

    updateTask: (
        todolistId: string,
        todolistTaskId: string,
        model: UpdateDomainTaskModelType
    ) =>
        ({
            type: 'todo/tasks/UPDATE_TASK',
            payload: { todolistId, todolistTaskId, model },
        } as const),

    removeTask: (todolistId: string, taskId: string) =>
        ({ type: 'todo/tasks/REMOVE_TASK', payload: { taskId, todolistId } } as const),
}

export const fetchTasks = (todolistId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(appActions.setAppStatus('loading'))
        const { items } = await todolistsApi.getTasks(todolistId)
        dispatch(tasksActions.setTasks(items, todolistId))
        dispatch(appActions.setAppStatus('succeeded'))
    } catch (error) {
        console.log(error)
    }
}

export const removeTask = (todolistId: string, taskId: string) => async (
    dispatch: Dispatch<ActionsType>
) => {
    try {
        const { resultCode } = await todolistsApi.deleteTask(todolistId, taskId)
        !resultCode && dispatch(tasksActions.removeTask(todolistId, taskId))
    } catch (error) {
        console.log(error)
    }
}

export const addTask = (todolistId: string, title: string) => async (
    dispatch: Dispatch
) => {
    try {
        dispatch(appActions.setAppStatus('loading'))
        const data = await todolistsApi.createTask(todolistId, title)
        if (!data.resultCode) {
            dispatch(tasksActions.addTask(data.data.item))
            dispatch(appActions.setAppStatus('succeeded'))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

export const updateTask = (
    todolistId: string,
    taskId: string,
    domainModel: UpdateDomainTaskModelType
) => async (dispatch: Dispatch, getState: () => RootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find((t) => t.id === taskId)
    if (!task) {
        console.warn('task not found in the reducers')
        return
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        status: task.status,
        startDate: task.startDate,
        description: task.description,
        priority: task.priority,
        deadline: task.deadline,
        ...domainModel,
    }
    const data = await todolistsApi.updateTask(todolistId, taskId, apiModel)
    try {
        if (!data.resultCode) {
            dispatch(tasksActions.updateTask(todolistId, taskId, domainModel))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = { [key: string]: TaskType[] }
type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof tasksActions>
