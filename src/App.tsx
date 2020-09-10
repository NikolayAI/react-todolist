import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {Container, Typography} from "@material-ui/core";
import 'fontsource-roboto';
import PersistentDrawerRight from "./PersistentDrawerRight";
import {FullWidthGrid} from "./FullWidthGrid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
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
    const changeTaskTitle = (taskID: string, title: string, todoListId: string) => {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(t => t.id === taskID)
        if (task) {
            task.title = title
        }
        setTasksObj({...tasksObj})
    }
    const removeTodoList = (todolistId: string) => {
        let filteredTodolist = todoLists.filter(tl => tl.id !== todolistId)
        setTodoList(filteredTodolist)
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }
    const changeTodolistTitle = (title: string, todoListId: string) => {
        let filteredTodolist = todoLists.find(tl => tl.id === todoListId)
        if (filteredTodolist) {
            filteredTodolist.title = title
            setTodoList([...todoLists])
        }
    }
    const addTodolist = (title: string) => {
        let todolist: TodoListType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTasksObj({[todolist.id]: [], ...tasksObj})
        setTodoList([todolist, ...todoLists])
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
        })

    return (
        <ThemeProvider theme={theme}>
            <Typography variant="inherit" component="div">
                <div className="App" style={{overflowX: 'hidden'}}>
                    <PersistentDrawerRight/>
                    <Container>
                        <FullWidthGrid
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                            removeTodoList={removeTodoList}
                            addTodolist={addTodolist}
                            todoLists={todoLists}
                            tasksObj={tasksObj}/>
                    </Container>
                </div>
            </Typography>
        </ThemeProvider>
    )
}

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#33ab9f',
            main: '#009688',
            dark: '#00695f',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ffcf33',
            main: '#ffc400',
            dark: '#b28900',
            contrastText: '#000',
        },
    },
});

export default App;
