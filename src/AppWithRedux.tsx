import React from 'react';
import './App.css';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {Container, Typography} from "@material-ui/core";
import 'fontsource-roboto';
import PersistentDrawerRight from "./PersistentDrawerRight";
import {FullWidthGrid} from "./FullWidthGrid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";

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

function AppWithRedux() {

    const dispatch = useDispatch()
    const todoLists = useSelector<RootStateType, TodoListType[]>(state => state.todoLists)

    const changeFilter = (todoListId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todoListId, value))
    }
    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }
    const removeTodoList = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }
    const changeTodolistTitle = (todoListId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todoListId, title))
    }

    return (
        <ThemeProvider theme={theme}>
            <Typography variant="inherit" component="div">
                <div className="App" style={{overflowX: 'hidden'}}>
                    <PersistentDrawerRight/>
                    <Container>
                        <FullWidthGrid
                            changeFilter={changeFilter}
                            changeTodolistTitle={changeTodolistTitle}
                            removeTodoList={removeTodoList}
                            addTodolist={addTodolist}
                            todoLists={todoLists}/>
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

export default AppWithRedux;
