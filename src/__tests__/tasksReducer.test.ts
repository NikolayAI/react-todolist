import {
  updateTasks,
  addTasks,
  fetchTasks,
  removeTasks,
  tasksReducer,
  TasksStateType,
} from '../redux/reducers/tasksReducer'
import {
  addTodo,
  removeTodo,
  fetchTodoLists,
} from '../redux/reducers/todoListsReducer'
import { TaskPriorities, TaskStatuses } from '../api/api'

let startState: TasksStateType

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        startDate: '',
        priority: TaskPriorities.Low,
        order: 0,
        description: '',
        deadline: '',
        addedDate: '',
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        startDate: '',
        priority: TaskPriorities.Low,
        order: 0,
        description: '',
        deadline: '',
        addedDate: '',
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        startDate: '',
        priority: TaskPriorities.Low,
        order: 0,
        description: '',
        deadline: '',
        addedDate: '',
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        startDate: '',
        priority: TaskPriorities.Low,
        order: 0,
        description: '',
        deadline: '',
        addedDate: '',
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId2',
        startDate: '',
        priority: TaskPriorities.Low,
        order: 0,
        description: '',
        deadline: '',
        addedDate: '',
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        startDate: '',
        priority: TaskPriorities.Low,
        order: 0,
        description: '',
        deadline: '',
        addedDate: '',
      },
    ],
  }
})

test('correct task should be deleted from correct array', () => {
  const action = removeTasks.fulfilled(
    { todolistId: 'todolistId2', taskId: '2' },
    'requestId',
    { todolistId: 'todolistId2', taskId: '2' }
  )

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(2)
  expect(endState['todolistId2'].every((t) => t.id != '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {
  const action = addTasks.fulfilled(
    {
      id: '1',
      title: 'juce',
      status: TaskStatuses.New,
      todoListId: 'todolistId2',
      startDate: '',
      priority: TaskPriorities.Low,
      order: 0,
      description: '',
      deadline: '',
      addedDate: '',
    },
    'requestId',
    { todolistId: 'todolistId2', title: 'juce' }
  )

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('juce')
  expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
  let param = {
    todolistId: 'todolistId2',
    todolistTaskId: '2',
    model: {
      status: TaskStatuses.New,
    },
  }
  const action = updateTasks.fulfilled(param, 'requestId', param)

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
  expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
})

test('title of specified task should be changed', () => {
  let param = {
    todolistId: 'todolistId1',
    todolistTaskId: '1',
    model: {
      title: 'HTML',
    },
  }
  const action = updateTasks.fulfilled(param, 'requestId', param)

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'][0].title).toBe('HTML')
  expect(endState['todolistId2'][0].title).toBe('bread')
})

test('new array should be added when new todolist is added', () => {
  let param = {
    id: 'yo',
    addedDate: '',
    order: 0,
    title: 'new todolist',
  }
  const action = addTodo.fulfilled(param, 'requestId', param.title)

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k != 'todolistId1' && k != 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
  const action = removeTodo.fulfilled('todolistId2', 'requestId', 'todolistId2')

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).toBeUndefined()
})

test('empty arrays should be added when we set todolists', () => {
  let param = [
    { id: '1', title: 'What to learn', order: 0, addedDate: '' },
    { id: '2', title: 'What to buy', order: 0, addedDate: '' },
  ]
  const action = fetchTodoLists.fulfilled(param, 'requestId', undefined)

  const endState = tasksReducer({}, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState['1']).toStrictEqual([])
  expect(endState['2']).toStrictEqual([])
})

test('empty arrays should be added when we set todolists', () => {
  const action = fetchTasks.fulfilled(
    {
      tasks: startState['todolistId1'],
      todolistId: 'todolistId1',
    },
    'requestId',
    'todolistId1'
  )

  const endState = tasksReducer(
    {
      todolistId2: [],
      todolistId1: [],
    },
    action
  )

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(0)
})
