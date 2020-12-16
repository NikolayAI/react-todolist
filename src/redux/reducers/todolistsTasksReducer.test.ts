import { tasksReducer, TasksStateType } from './tasksReducer'
import { TodolistDomainType, todoListsReducer, addTodolist } from './todoListsReducer'
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

    const action = addTodolist(todolist)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.id)
    expect(idFromTodolists).toBe(action.payload.id)
})
