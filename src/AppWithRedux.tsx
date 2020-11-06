import React, {useCallback, useEffect} from 'react'
import './App.css'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import {Container, Typography} from "@material-ui/core"
import 'fontsource-roboto'
import {TodolistContainer} from "./TodolistContainer"
import {useDispatch, useSelector} from "react-redux"
import {HeaderMenu} from "./HeaderMenu"
import {Login} from './features/Login/Login'
import {GlobalStateType} from './state/store'
import {initializedAppTC} from './state/appReducer'
import CircularProgress from '@material-ui/core/CircularProgress'
import {CustomizedSnackbars} from './components/ErrorSnackbar/ErrorSnackbar'
import {TaskType} from "./api/todolists-api"
import {BrowserRouter, Route} from 'react-router-dom'
import {fetchTodolistsTC} from './state/todolists-reducer'
import {logoutTC} from './features/Login/authReducer'

export type TasksStateType = {
    [key: string]: TaskType[]
}

type AppWithReduxPropsType = {
    demo?: boolean
}

const AppWithRedux: React.FC<AppWithReduxPropsType> = ({demo = false}) => {

    const dispatch = useDispatch()
    const isInitialized = useSelector<GlobalStateType>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<GlobalStateType>(state => state.auth.isLoggedIn)


    useEffect(() => {
        dispatch(initializedAppTC())
    }, [])


    const handleLogout = () => {
        dispatch(logoutTC())
    }


    if (!isInitialized) {
        return <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Typography variant="inherit" component="div">
                    <div className="App" style={{overflowX: 'hidden'}}>
                        <HeaderMenu handleLogout={handleLogout}/>
                        <CustomizedSnackbars/>
                        <Container>
                            <Route exact path={'/'} render={() => <TodolistContainer demo={demo}/>}/>
                            <Route path={'/login/'} render={() => <Login/>}/>
                        </Container>
                    </div>
                </Typography>
            </ThemeProvider>
        </BrowserRouter>
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
})

export default AppWithRedux
