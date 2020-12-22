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
        return instance
            .get<ResponseType<TodolistType[]>>(`todo-lists`)
            .then((res) => res.data)
    },
    createTodolist(title: string) {
        return instance
            .post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {
                title,
            })
            .then((res) => res.data)
    },
    deleteTodolists(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`).then((res) => res.data)
    },
    updateTodolist(id: string, title: string) {
        return instance
            .put<ResponseType>(`todo-lists/${id}`, { title })
            .then((res) => res.data)
    },
    getTasks(todolistId: string) {
        return instance
            .get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
            .then((res) => res.data)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance
            .delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then((res) => res.data)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance
            .post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/`, {
                title: taskTitle,
            })
            .then((res) => res.data)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance
            .put<ResponseType<TaskType>>(
                `todo-lists/${todolistId}/tasks/${taskId}`,
                model
            )
            .then((res) => res.data)
    },
}
