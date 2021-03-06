import {
  addTodo,
  changeTodolistEntityStatus,
  changeTodolistFilter,
  changeTodoTitle,
  fetchTodoLists,
  FilterValuesType,
  removeTodo,
  TodolistDomainType,
  todoListsReducer,
} from '../redux/reducers/todoListsReducer'
import { v1 } from 'uuid'
import { RequestStatusType } from '../redux/reducers/appReducer'
import { TodolistType } from '../api/api'

let todolistId1: string
let todolistId2: string
let startState: TodolistDomainType[] = []

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = [
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
})

test('correct todolist should be removed', () => {
  const endState = todoListsReducer(
    startState,
    removeTodo.fulfilled(todolistId1, 'requestId', todolistId1)
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

  const endState = todoListsReducer(
    startState,
    addTodo.fulfilled(todolist, 'requestId', todolist.title)
  )

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(todolist.title)
})

test('correct todolist should change its name', () => {
  let newTodolistTitle = 'New TodolistList'

  let param = {
    todolistId: todolistId2,
    newTitle: newTodolistTitle,
  }
  const endState = todoListsReducer(
    startState,
    changeTodoTitle.fulfilled(param, 'requestId', param)
  )

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValuesType = 'completed'

  const endState = todoListsReducer(
    startState,
    changeTodolistFilter({
      todolistId: todolistId2,
      newFilter: newFilter,
    })
  )

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})

test('todolists should be added to the reducers', () => {
  const endState = todoListsReducer(
    [],
    fetchTodoLists.fulfilled(startState, 'requestId', undefined)
  )

  expect(endState.length).toBe(2)
})

test('correct entity status of todolist should be changed', () => {
  let newStatus: RequestStatusType = 'loading'

  const action = changeTodolistEntityStatus({
    todolistId: todolistId2,
    newStatus: newStatus,
  })

  const endState = todoListsReducer(startState, action)

  expect(endState[0].entityStatus).toBe('idle')
  expect(endState[1].entityStatus).toBe('loading')
})
