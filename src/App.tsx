import React, { useEffect } from "react";
import "./App.module.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import "fontsource-roboto";
import { TodolistContainer } from "./pages/Todolist/TodolistContainer";
import { useDispatch, useSelector } from "react-redux";
import { HeaderMenu } from "./components/HeaderMenu/HeaderMenu";
import { Login } from "./pages/Login/Login";
import { GlobalStateType } from "./state/store";
import { initializedAppTC } from "./state/appReducer";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CustomizedSnackbars } from "./components/ErrorSnackbar/ErrorSnackbar";
import { TaskType } from "./api/todolists-api";
import { BrowserRouter, Route } from "react-router-dom";
import { logoutTC } from "./state/authReducer";
import style from "./App.module.css";

export type TasksStateType = {
  [key: string]: TaskType[];
};

type AppPropsType = {
  demo?: boolean;
};

export const App: React.FC<AppPropsType> = ({ demo = false }) => {
  const dispatch = useDispatch();
  const isInitialized = useSelector<GlobalStateType>(
    (state) => state.app.isInitialized
  );

  useEffect(() => {
    dispatch(initializedAppTC());
  }, [dispatch]);

  const onLogout = () => dispatch(logoutTC());

  if (!isInitialized) {
    return (
      <div className={style.progress}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Typography variant="inherit" component="div">
          <div className="App" style={{ overflowX: "hidden" }}>
            <HeaderMenu onLogout={onLogout} />
            <CustomizedSnackbars />
            <Container>
              <Route
                exact
                path={"/"}
                render={() => <TodolistContainer demo={demo} />}
              />
              <Route path={"/login/"} render={() => <Login />} />
            </Container>
          </div>
        </Typography>
      </ThemeProvider>
    </BrowserRouter>
  );
};

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33ab9f",
      main: "#009688",
      dark: "#00695f",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffcf33",
      main: "#ffc400",
      dark: "#b28900",
      contrastText: "#000",
    },
  },
});

export default App;
