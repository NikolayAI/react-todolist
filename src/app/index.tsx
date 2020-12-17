import React, { useEffect } from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Container, Typography } from '@material-ui/core'
import 'fontsource-roboto'
import { TodolistList } from '../pages/TodolistList'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderMenu } from '../components/HeaderMenu'
import { Login } from '../pages/Login'
import { initializedApp } from '../redux/reducers/appReducer'
import CircularProgress from '@material-ui/core/CircularProgress'
import { ErrorSnackbar } from '../components/ErrorSnackbar'
import { Route } from 'react-router-dom'
import { logout } from '../redux/reducers/authReducer'
import style from './index.module.css'
import { getInitialized } from '../redux/selectors/appSelectors'

type AppPropsType = {
    demo?: boolean
}

export const App: React.FC<AppPropsType> = ({ demo = false }) => {
    const dispatch = useDispatch()
    const isInitialized = useSelector(getInitialized)

    useEffect(() => {
        if (!demo) dispatch(initializedApp())
    }, [dispatch])

    const onLogout = () => dispatch(logout())

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
                <div className={style.App} style={{ overflowX: 'hidden' }}>
                    <HeaderMenu onLogout={onLogout} />
                    <ErrorSnackbar />
                    <Container>
                        <Route
                            exact
                            path={'/'}
                            render={() => <TodolistList demo={demo} />}
                        />
                        <Route path={'/login/'} render={() => <Login />} />
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
})
