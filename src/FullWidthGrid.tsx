import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {AddItemForm} from "./AddItemForm";
import {TodoList} from "./Todolist";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {FilterValuesType, TasksStateType, TodoListType} from "./App";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'left',
            color: theme.palette.text.secondary,
            backgroundColor: '#dedede',
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),);

type FullWidthGridPropsType = {
    removeTask: (taskID: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListId: string) => void
    changeTodolistTitle: (title: string, todoListId: string) => void
    removeTodoList: (todolistId: string) => void
    addTodolist: (title: string) => void
    todoLists: TodoListType[]
    tasksObj: TasksStateType
}

export function FullWidthGrid(props: FullWidthGridPropsType) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Paper className={classes.paper}><h2 style={{minWidth: '240px', color: 'black'}}>Create
                        Todolist</h2><AddItemForm
                        addItem={props.addTodolist}/></Paper>
                </Grid>
                {props.todoLists.map(tl => {
                    let tasksForTodolist = props.tasksObj[tl.id]
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                    }
                    return (
                        <Grid key={tl.id} item style={{margin: '0'}} xs>
                            <Paper className={classes.paper}>
                                <TodoList
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTask={props.removeTask}
                                    changeFilter={props.changeFilter}
                                    addTask={props.addTask}
                                    changeTaskStatus={props.changeTaskStatus}
                                    changeTaskTitle={props.changeTaskTitle}
                                    changeTodolistTitle={props.changeTodolistTitle}
                                    filter={tl.filter}
                                    removeTodoList={props.removeTodoList}/>
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
}