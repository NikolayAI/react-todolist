import {
    GetTasksType,
    instance,
    ResponseType,
    TaskType,
    TodolistType,
    UpdateTaskModelType,
} from './api'

export const todolistsApi = {
    getTodolists() {
        return instance.get<Array<TodolistType>>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {
            title,
        })
    },
    deleteTodolists(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, { title })
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(
            `todo-lists/${todolistId}/tasks/`,
            { title: taskTitle }
        )
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<TaskType>>(
            `todo-lists/${todolistId}/tasks/${taskId}`,
            model
        )
    },
}
