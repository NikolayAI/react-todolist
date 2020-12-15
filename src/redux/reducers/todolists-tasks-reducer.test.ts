import { tasksReducer, TasksStateType } from './tasks-reducer'
import {
    TodolistDomainType,
    todolistsReducer,
    todolistActions,
} from './todolists-reducer'
import { TodolistType } from '../../api/api'

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const todolist: TodolistType = {
        title: 'new todolist',
        order: 0,
        addedDate: '',
        id: 'anyId',
    }

    const action = todolistActions.addTodolist(todolist)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.id)
    expect(idFromTodolists).toBe(action.payload.id)
})
