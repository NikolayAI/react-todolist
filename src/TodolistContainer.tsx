import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {AddItemForm} from "./AddItemForm";
import {TodoList} from "./Todolist";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {FilterValuesType, TodolistDomainType} from "./state/todolists-reducer";

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
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    changeTodolistTitle: (todoListId: string, title: string) => void
    removeTodoList: (todolistId: string) => void
    addTodolist: (title: string) => void
    todoLists: TodolistDomainType[]
}

export const TodolistContainer = React.memo((props: FullWidthGridPropsType) => {
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
                    return (
                        <Grid key={tl.id} item style={{margin: '0'}} xs={12} sm={6} md={4}>
                            <Paper className={classes.paper}>
                                <TodoList
                                    id={tl.id}
                                    title={tl.title}
                                    changeFilter={props.changeFilter}
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
})