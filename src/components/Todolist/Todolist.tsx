import React, { useCallback, useEffect } from "react";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { Button, ButtonGroup, Grid, IconButton } from "@material-ui/core";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import { useDispatch, useSelector } from "react-redux";
import { GlobalStateType } from "../../store/store";
import { addTaskTC, fetchTasksTC } from "../../store/tasks-reducer";
import { Task } from "../Task/Task";
import { TaskStatuses, TaskType } from "../../api/todolistsApi";
import {
  FilterValuesType,
  TodolistDomainType,
} from "../../store/todolists-reducer";

type PropsType = {
  todolist: TodolistDomainType;
  onChangeFilter: (todoListId: string, value: FilterValuesType) => void;
  onChangeTodolistTitle: (todoListId: string, title: string) => void;
  onRemoveTodoList: (todolistId: string) => void;
  demo?: boolean;
};

export const TodoList: React.FC<PropsType> = React.memo(
  ({
    demo = false,
    onChangeFilter,
    onChangeTodolistTitle,
    onRemoveTodoList,
    todolist,
  }) => {
    const dispatch = useDispatch();
    const tasks = useSelector<GlobalStateType, TaskType[]>(
      (state) => state.tasks[todolist.id]
    );

    useEffect(() => {
      if (demo) return;
      dispatch(fetchTasksTC(todolist.id));
    }, [dispatch, todolist.id, demo]);

    const onAddTask = useCallback(
      (title: string) => {
        dispatch(addTaskTC(todolist.id, title));
      },
      [dispatch, todolist.id]
    );

    const onAllClickHandler = useCallback(() => {
      onChangeFilter(todolist.id, "all");
    }, [todolist.id, onChangeFilter]);

    const onActiveClickHandler = useCallback(() => {
      onChangeFilter(todolist.id, "active");
    }, [todolist.id, onChangeFilter]);

    const onCompletedClickHandler = useCallback(() => {
      onChangeFilter(todolist.id, "completed");
    }, [todolist.id, onChangeFilter]);

    const handleClickRemoveTodoList = useCallback(() => {
      onRemoveTodoList(todolist.id);
    }, [todolist.id, onRemoveTodoList]);

    const onHandleChangeTodolistTitle = useCallback(
      (title: string) => {
        onChangeTodolistTitle(todolist.id, title);
      },
      [todolist.id, onChangeTodolistTitle]
    );

    let tasksForTodolist = tasks;

    if (todolist.filter === "active") {
      tasksForTodolist = tasksForTodolist.filter(
        (t) => t.status === TaskStatuses.New
      );
    }

    if (todolist.filter === "completed") {
      tasksForTodolist = tasksForTodolist.filter(
        (t) => t.status === TaskStatuses.Completed
      );
    }

    return (
      <div style={{ position: "relative" }}>
        <IconButton
          disabled={todolist.entityStatus === "loading"}
          style={{ position: "absolute", padding: "0", left: "0.5rem" }}
          onClick={handleClickRemoveTodoList}
        >
          <CancelPresentationIcon color={"action"} />
        </IconButton>
        <Grid container direction="row" justify="center" alignItems="center">
          <h2>
            <EditableSpan
              title={todolist.title}
              onChange={onHandleChangeTodolistTitle}
            />
          </h2>
        </Grid>
        <AddItemForm
          onAddItem={onAddTask}
          disabled={todolist.entityStatus === "loading"}
        />
        <div style={{ paddingLeft: "0" }}>
          {tasksForTodolist.map((t) => {
            return (
              <Task
                taskId={t.id}
                todolistId={todolist.id}
                taskTitle={t.title}
                status={t.status}
                key={t.id}
              />
            );
          })}
        </div>
        <ButtonGroup style={{ width: "100%", minWidth: "240px" }}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Button
              variant="contained"
              color={todolist.filter === "all" ? "secondary" : "primary"}
              onClick={onAllClickHandler}
            >
              All
            </Button>
            <Button
              variant="contained"
              color={todolist.filter === "active" ? "secondary" : "primary"}
              onClick={onActiveClickHandler}
            >
              Active
            </Button>
            <Button
              variant="contained"
              color={todolist.filter === "completed" ? "secondary" : "primary"}
              onClick={onCompletedClickHandler}
            >
              Completed
            </Button>
          </Grid>
        </ButtonGroup>
      </div>
    );
  }
);
