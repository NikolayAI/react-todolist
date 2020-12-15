import {
    FilterValuesType,
    TodolistDomainType,
    todolistsReducer,
    todolistActions,
} from './todolists-reducer'
import { v1 } from 'uuid'
import { RequestStatusType } from './appReducer'
import { TodolistType } from '../../api/api'

let todolistId1 = v1()
let todolistId2 = v1()

const startState: Array<TodolistDomainType> = [
    {
        id: todolistId1,
        title: 'What to learn',
        filter: 'all',
        entityStatus: 'idle',
        order: 0,
        addedDate: '',
    },
    {
        id: todolistId2,
        title: 'What to buy',
        filter: 'all',
        entityStatus: 'idle',
        order: 0,
        addedDate: '',
    },
]

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(
        startState,
        todolistActions.removeTodolist(todolistId1)
    )

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const todolist: TodolistType = {
        title: 'New TodolistList',
        order: 0,
        addedDate: '',
        id: 'anyId',
    }

    const endState = todolistsReducer(startState, todolistActions.addTodolist(todolist))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(todolist.title)
})

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New TodolistList'

    const endState = todolistsReducer(
        startState,
        todolistActions.changeTodolistTitle(todolistId2, newTodolistTitle)
    )

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed'

    const endState = todolistsReducer(
        startState,
        todolistActions.changeTodolistFilter(todolistId2, newFilter)
    )

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

test('todolists should be added to the reducers', () => {
    const endState = todolistsReducer([], todolistActions.setTodolists(startState))

    expect(endState.length).toBe(2)
})

test('correct entity status of todolist should be changed', () => {
    let newStatus: RequestStatusType = 'loading'

    const action = todolistActions.changeTodolistEntityStatus(todolistId2, newStatus)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe('loading')
})
