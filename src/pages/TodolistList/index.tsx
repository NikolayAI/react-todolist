import React, { useCallback, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { AddItemForm } from '../../components/AddItemForm'
import { Todolist } from '../../components/Todolist'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import * as todoActions from '../../redux/reducers/todoListsReducer'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { isLoggedInSelector } from '../../redux/selectors/authSelector'
import { todoListsSelector } from '../../redux/selectors/todolistsSelectors'
import { useActions } from '../../redux/store'

type TodolistContainerPropsType = {
    demo?: boolean
}

export const TodolistList: React.FC<TodolistContainerPropsType> = React.memo(
    ({ demo }) => {
        const classes = useStyles()
        const { addTodo, fetchTodoLists } = useActions(todoActions)
        const todoLists = useSelector(todoListsSelector)
        const isLoggedIn = useSelector(isLoggedInSelector)

        useEffect(() => {
            if (demo || !isLoggedIn) return
            fetchTodoLists()
        }, [fetchTodoLists, demo, isLoggedIn])

        const handleAddTodo = useCallback(
            async (title: string) => {
                addTodo(title)
            },
            [addTodo]
        )

        if (!isLoggedIn) return <Redirect to={'/login/'} />

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
                                    <Todolist todolist={tl} demo={demo} />
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
            minWidth: 280,
        },
        paper: {
            padding: theme.spacing(),
            textAlign: 'left',
            color: theme.palette.text.secondary,
            backgroundColor: '#dedede',
            width: '100%',
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    })
)
