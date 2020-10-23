import React, {useCallback, useEffect} from 'react';
import './App.css';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {Container, Typography} from "@material-ui/core";
import 'fontsource-roboto';
import {TodolistContainer} from "./TodolistContainer";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";
import PersistentDrawerRight from "./PersistentDrawerRight";
import {TaskType} from "./api/todolists-api";

export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {
    console.log('AppWithRedux')
    const dispatch = useDispatch()
    const todoLists = useSelector<RootStateType, TodolistDomainType[]>(state => state.todoLists)

    useEffect(() => {dispatch(fetchTodolistsTC())}, [])

    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todoListId, value))
    }, [changeTodolistFilterAC])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [addTodolistTC])
    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [removeTodolistTC])
    const changeTodolistTitle = useCallback((todoListId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todoListId, title))
    }, [changeTodolistTitleTC])

    return (
        <ThemeProvider theme={theme}>
            <Typography variant="inherit" component="div">
                <div className="App" style={{overflowX: 'hidden'}}>
                    <PersistentDrawerRight/>
                    <Container>
                        <TodolistContainer
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
