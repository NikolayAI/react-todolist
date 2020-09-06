import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Todolist";
import {v1} from 'uuid'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key:string]: TaskType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const addTask = (title: string, todoListId: string) => {
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todoListId]
        let newTasks = ([newTask, ...tasks])
        tasksObj[todoListId] = newTasks
        setTasksObj({...tasksObj})
    }

    function removeTask(taskID: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.filter(t => t.id !== taskID)
        tasksObj[todoListId] = task
        setTasksObj({...tasksObj})
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todolist = todoLists.find(t => t.id === todoListId)
        if (todolist) {
            todolist.filter = value
            setTodoList([...todoLists])
        }
    }

    const changeStatus = (taskID: string, isDone: boolean, todoListId: string) => {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
        }
        setTasksObj({...tasksObj})
    }

    const removeTodoList = (todolistId: string) => {
        let filteredTodolist = todoLists.filter(tl => tl.id !== todolistId)
        setTodoList(filteredTodolist)
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }

    let todoListsId1 = v1()
    let todoListsId2 = v1()

    let [todoLists, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListsId1, title: 'What to learn', filter: 'all'},
        {id: todoListsId2, title: 'What to buy', filter: 'all'},
    ])

    let [tasksObj, setTasksObj] = useState<TasksStateType>({
            [todoListsId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: false},
                {id: v1(), title: "React", isDone: true},
                {id: v1(), title: "GraphQL", isDone: true},
                {id: v1(), title: "REST API", isDone: true}
            ],
            [todoListsId2]: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Brad", isDone: false},
            ],
        }
    )

    return (
        <div className="App">
            {todoLists.map(tl => {
                let tasksForTodolist = tasksObj[tl.id]
                if (tl.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                }
                return (
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                    />
                )
            })}
        </div>
    )
}

export default App;
