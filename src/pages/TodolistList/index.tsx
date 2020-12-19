import React, { useCallback, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { AddItemForm } from '../../components/AddItemForm'
import { Todolist } from '../../components/Todolist'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { FilterValuesType, todoActions } from '../../redux/reducers/todoListsReducer'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { isLoggedInSelector } from '../../redux/selectors/authSelector'
import { todoListsSelector } from '../../redux/selectors/todolistsSelectors'
import { useActions, useAppDispatch } from '../../redux/store'

type TodolistContainerPropsType = {
    demo?: boolean
}

export const TodolistList: React.FC<TodolistContainerPropsType> = React.memo(
    ({ demo }) => {
        const classes = useStyles()
        const {
            removeTodo,
            addTodo,
            changeTodolistFilter,
            changeTodoTitle,
            fetchTodoLists,
        } = useActions(todoActions)
        const dispatch = useAppDispatch()
        const todoLists = useSelector(todoListsSelector)
        const isLoggedIn = useSelector(isLoggedInSelector)

        useEffect(() => {
            if (demo || !isLoggedIn) return
            fetchTodoLists()
        }, [fetchTodoLists, demo, isLoggedIn])

        const onChangeFilter = useCallback(
            (todolistId: string, newFilter: FilterValuesType) => {
                changeTodolistFilter({ todolistId, newFilter })
            },
            [changeTodolistFilter]
        )

        const onChangeTodolistTitle = useCallback(
            (todolistId: string, newTitle: string) => {
                changeTodoTitle({ todolistId, newTitle })
            },
            [changeTodoTitle]
        )

        const onRemoveTodoList = useCallback(
            (todolistId: string) => {
                removeTodo(todolistId)
            },
            [removeTodo]
        )

        const onAddTodolist = useCallback(
            (title: string) => {
                addTodo(title)
            },
            [addTodo]
        )

        if (!isLoggedIn) return <Redirect to={'/login/'} />

        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Paper className={classes.paper}>
                            <h2 style={{ minWidth: '240px', color: 'black' }}>
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
                                style={{ margin: '0' }}
                                xs={12}
                                sm={6}
                                md={4}
                            >
                                <Paper className={classes.paper}>
                                    <Todolist
                                        todolist={tl}
                                        demo={demo}
                                        onChangeFilter={onChangeFilter}
                                        onChangeTodolistTitle={onChangeTodolistTitle}
                                        onRemoveTodoList={onRemoveTodoList}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        )
    }
)

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
    })
)
