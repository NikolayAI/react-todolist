import React, { useEffect } from 'react'
import './App.module.css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Container, Typography } from '@material-ui/core'
import 'fontsource-roboto'
import { TodolistList } from './pages/TodolistList'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderMenu } from './components/HeaderMenu'
import { Login } from './pages/Login'
import { GlobalStateType } from './store/store'
import { initializedAppTC } from './store/appReducer'
import CircularProgress from '@material-ui/core/CircularProgress'
import { ErrorSnackbar } from './components/ErrorSnackbar'
import { TaskType } from './api/todolistsApi'
import { BrowserRouter, Route } from 'react-router-dom'
import { logoutTC } from './store/authReducer'
import style from './App.module.css'

export type TasksStateType = {
  [key: string]: TaskType[]
}

type AppPropsType = {
  demo?: boolean
}

export const App: React.FC<AppPropsType> = ({ demo = false }) => {
  const dispatch = useDispatch()
  const isInitialized = useSelector<GlobalStateType>(
    (state) => state.app.isInitialized
  )

  useEffect(() => {
    dispatch(initializedAppTC())
  }, [dispatch])

  const onLogout = () => dispatch(logoutTC())

  if (!isInitialized) {
    return (
      <div className={style.progress}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Typography variant='inherit' component='div'>
          <div className='App' style={{ overflowX: 'hidden' }}>
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

export default App
