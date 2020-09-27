import React, {useReducer} from 'react';
import './App.css';
import {v1} from 'uuid'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {Container, Typography} from "@material-ui/core";
import 'fontsource-roboto';
import PersistentDrawerRight from "./PersistentDrawerRight";
import {FullWidthGrid} from "./FullWidthGrid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

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

function AppWithReducer() {

    let todoListsId1 = v1()
    let todoListsId2 = v1()

    let [todoLists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todoListsId1, title: 'What to learn', filter: 'all'},
        {id: todoListsId2, title: 'What to buy', filter: 'all'},
    ])
    let [tasksObj, dispatchTasks] = useReducer(tasksReducer, {
        [todoListsId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "GraphQL", isDone: true},
            {id: v1(), title: "REST API", isDone: true},
        ],
        [todoListsId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Brad", isDone: false},
        ],
    })

    const addTask = (title: string, todoListId: string) => dispatchTasks(addTaskAC(title,todoListId ))

    const removeTask = (taskID: string, todoListId: string) => dispatchTasks(removeTaskAC(taskID, todoListId))
    const changeStatus = (taskID: string, isDone: boolean, todoListId: string) => {
        dispatchTasks(changeTaskStatusAC(taskID, isDone,todoListId))
    }
    const changeTaskTitle = (todoListId: string, taskID: string, title: string) => {
        dispatchTasks(changeTaskTitleAC(todoListId, taskID, title))
    }

    const changeFilter = (todoListId: string, value: FilterValuesType) => {
        dispatchTodolists(changeTodolistFilterAC(todoListId, value))
    }
    const addTodolist = (title: string) => {
        dispatchTasks(addTodolistAC(title))
        dispatchTodolists(addTodolistAC(title))
    }
    const removeTodoList = (todolistId: string) => {
        dispatchTasks(removeTodolistAC(todolistId))
        dispatchTodolists(removeTodolistAC(todolistId))
    }
    const changeTodolistTitle = (todoListId: string, title: string) => {
        dispatchTodolists(changeTodolistTitleAC(todoListId, title))
    }

    return (
        <ThemeProvider theme={theme}>
            <Typography variant="inherit" component="div">
                <div className="App" style={{overflowX: 'hidden'}}>
                    <PersistentDrawerRight/>
                    <Container>
                        <FullWidthGrid
                            // removeTask={removeTask}
                            changeFilter={changeFilter}
                            // addTask={addTask}
                            // changeTaskStatus={changeStatus}
                            // changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                            removeTodoList={removeTodoList}
                            addTodolist={addTodolist}
                            todoLists={todoLists}
                            // tasksObj={tasksObj}
                        />
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

export default AppWithReducer;
