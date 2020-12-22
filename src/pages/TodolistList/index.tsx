import React, { useCallback, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { AddItemForm } from '../../components/AddItemForm'
import { Todolist } from '../../components/Todolist'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { addTodo, fetchTodoLists } from '../../redux/reducers/todoListsReducer'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { isLoggedInSelector } from '../../redux/selectors/authSelector'
import { todoListsSelector } from '../../redux/selectors/todolistsSelectors'
import { useAppDispatch } from '../../app/store'

export const TodolistList: React.FC = React.memo(() => {
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const todoLists = useSelector(todoListsSelector)
    const isLoggedIn = useSelector(isLoggedInSelector)

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(fetchTodoLists())
    }, [dispatch, isLoggedIn])

    const handleAddTodo = useCallback(
        async (title: string) => {
            const action = await dispatch(addTodo(title))
            if (addTodo.rejected.match(action)) {
                if (action.payload?.errors?.length) {
                    const errorMessage = action.payload.errors[0]
                    throw new Error(errorMessage)
                } else {
                    throw new Error('Some error')
                }
            }
        },
        [dispatch]
    )

    if (!isLoggedIn) return <Redirect to={'/login'} />

    return (
        <div className={classes.root}>
            <Grid container spacing={3} className={classes.gridContainer}>
                <Grid item xs className={classes.grid} style={{ padding: 8 }}>
                    <Paper className={classes.paper}>
                        <h2 style={{ minWidth: '240px', color: 'black' }}>
                            Create Todolist
                        </h2>
                        <AddItemForm onAddItem={handleAddTodo} />
                    </Paper>
                </Grid>
                {todoLists.map((tl) => {
                    return (
                        <Grid
                            key={tl.id}
                            className={classes.grid}
                            style={{ padding: 8 }}
                            item
                            xs={12}
                            sm={6}
                            md={4}
                        >
                            <Paper className={classes.paper}>
                                <Todolist todolist={tl} demo={false} />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
})

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            paddingLeft: 16,
            paddingRight: 16,
        },
        gridContainer: {
            flexWrap: 'nowrap',
            overflowX: 'scroll',
            minHeight: `calc(100vh - 112px)`,
        },
        grid: {
            margin: 0,
            maxWidth: 280,
        },
        paper: {
            padding: theme.spacing(),
            textAlign: 'left',
            color: theme.palette.text.secondary,
            backgroundColor: '#dedede',
            width: 264,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    })
)
