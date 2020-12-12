import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { TodoList } from "../../components/Todolist/Todolist";
import React, { useCallback, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistTC,
  TodolistDomainType,
} from "../../store/todolists-reducer";
import { useDispatch, useSelector } from "react-redux";
import { GlobalStateType } from "../../store/store";
import { Redirect } from "react-router-dom";

type TodolistContainerPropsType = {
  demo?: boolean;
};

export const TodolistList: React.FC<TodolistContainerPropsType> = React.memo(
  ({ demo }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const todoLists = useSelector<GlobalStateType, TodolistDomainType[]>(
      (state) => state.todoLists
    );
    const isLoggedIn = useSelector<GlobalStateType>(
      (state) => state.auth.isLoggedIn
    );

    useEffect(() => {
      if (demo || !isLoggedIn) return;
      dispatch(fetchTodolistsTC());
    }, [dispatch, demo, isLoggedIn]);

    const onChangeFilter = useCallback(
      (todoListId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todoListId, value));
      },
      [dispatch]
    );

    const onAddTodolist = useCallback(
      (title: string) => {
        dispatch(addTodolistTC(title));
      },
      [dispatch]
    );

    const onRemoveTodoList = useCallback(
      (todolistId: string) => {
        dispatch(removeTodolistTC(todolistId));
      },
      [dispatch]
    );

    const onChangeTodolistTitle = useCallback(
      (todoListId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todoListId, title));
      },
      [dispatch]
    );

    if (!isLoggedIn) return <Redirect to={"/login/"} />;

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <h2 style={{ minWidth: "240px", color: "black" }}>
                Create Todolist
              </h2>
              <AddItemForm onAddItem={onAddTodolist} />
            </Paper>
          </Grid>
          {todoLists.map((tl) => {
            return (
              <Grid
                key={tl.id}
                item
                style={{ margin: "0" }}
                xs={12}
                sm={6}
                md={4}
              >
                <Paper className={classes.paper}>
                  <TodoList
                    todolist={tl}
                    demo={demo}
                    onChangeFilter={onChangeFilter}
                    onChangeTodolistTitle={onChangeTodolistTitle}
                    onRemoveTodoList={onRemoveTodoList}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "left",
      color: theme.palette.text.secondary,
      backgroundColor: "#dedede",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);
