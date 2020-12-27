import React, { useEffect } from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import 'fontsource-roboto'
import { TodolistList } from '../pages/TodolistList'
import { useSelector } from 'react-redux'
import { HeaderMenu } from '../components/HeaderMenu'
import { Login } from '../pages/Login'
import * as appActions from '../redux/reducers/appReducer'
import CircularProgress from '@material-ui/core/CircularProgress'
import { ErrorSnackbar } from '../components/ErrorSnackbar'
import { Route } from 'react-router-dom'
import * as authActions from '../redux/reducers/authReducer'
import style from './index.module.css'
import { selectInitialized } from '../redux/selectors/appSelectors'
import { useActions } from '../utils/reduxUtils'

export const App: React.FC = () => {
    const { initializedApp } = useActions(appActions)
    const { logout } = useActions(authActions)
    const isInitialized = useSelector(selectInitialized)

    useEffect(() => {
        if (!isInitialized) initializedApp()
    }, [initializedApp, isInitialized])

    const onLogout = () => logout()

    if (!isInitialized) {
        return (
            <div className={style.progress}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <Typography variant='inherit' component='div'>
                <div>
                    <HeaderMenu onLogout={onLogout} />
                    <ErrorSnackbar />
                    <Route exact path={'/'} render={() => <TodolistList />} />
                    <Route path={'/login'} render={() => <Login />} />
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
})
