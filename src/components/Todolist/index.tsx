import React, { useCallback, useEffect } from 'react'
import { AddItemForm } from '../AddItemForm'
import { EditableSpan } from '../EditableSpan'
import { Button, ButtonGroup, Grid, IconButton } from '@material-ui/core'
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation'
import { useSelector } from 'react-redux'
import * as tasksActions from '../../redux/reducers/tasksReducer'
import { Task } from '../Task'
import * as todoActions from '../../redux/reducers/todoListsReducer'
import { FilterValuesType } from '../../redux/reducers/todoListsReducer'
import { TaskStatuses } from '../../api/api'
import { tasksSelector } from '../../redux/selectors/tasksSelector'
import { useActions } from '../../redux/store'

type PropsType = {
    todolist: todoActions.TodolistDomainType
    demo?: boolean
}

export const Todolist: React.FC<PropsType> = React.memo(({ demo = false, todolist }) => {
    const { removeTodo, changeTodolistFilter, changeTodoTitle } = useActions(todoActions)
    const { addTasks, fetchTasks } = useActions(tasksActions)
    const tasks = useSelector(tasksSelector(todolist.id))

    useEffect(() => {
        if (demo) return
        fetchTasks(todolist.id)
    }, [fetchTasks, todolist.id, demo])

    const onAddTask = useCallback(
        async (title: string) => {
            addTasks({ todolistId: todolist.id, title })
        },
        [addTasks, todolist.id]
    )

    const handleClickFilterButton = useCallback(
        (filter: FilterValuesType) => {
            changeTodolistFilter({ todolistId: todolist.id, newFilter: filter })
        },
        [todolist.id, changeTodolistFilter]
    )

    const handleClickRemoveTodoList = useCallback(() => {
        removeTodo(todolist.id)
    }, [todolist.id, removeTodo])

    const handleChangeTodolistTitle = useCallback(
        (newTitle: string) => {
            changeTodoTitle({ todolistId: todolist.id, newTitle })
        },
        [todolist.id, changeTodoTitle]
    )

    const renderFilterButton = useCallback(
        (filter: FilterValuesType, text: string) => (
            <Button
                variant='contained'
                color={todolist.filter === filter ? 'secondary' : 'primary'}
                onClick={() => handleClickFilterButton(filter)}
                size={'small'}
            >
                {text}
            </Button>
        ),
        [todolist.filter, handleClickFilterButton]
    )

    let tasksForTodolist = tasks

    if (todolist.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.New)
    }

    if (todolist.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(
            (t) => t.status === TaskStatuses.Completed
        )
    }

    return (
        <div style={{ position: 'relative' }}>
            <IconButton
                disabled={todolist.entityStatus === 'loading'}
                style={{ position: 'absolute', padding: 0, top: -3, left: -1 }}
                onClick={handleClickRemoveTodoList}
            >
                <CancelPresentationIcon color={'action'} />
            </IconButton>
            <Grid container direction='row' justify='center' alignItems='center'>
                <Grid justify='center' alignItems='center'>
                    <EditableSpan
                        title={todolist.title}
                        onChange={handleChangeTodolistTitle}
                        fontSize={24}
                    />
                </Grid>
            </Grid>
            <AddItemForm
                onAddItem={onAddTask}
                disabled={todolist.entityStatus === 'loading'}
            />
            <div style={{ paddingLeft: '0' }}>
                {tasksForTodolist.map((t) => {
                    return (
                        <Task
                            taskId={t.id}
                            todolistId={todolist.id}
                            taskTitle={t.title}
                            status={t.status}
                            key={t.id}
                        />
                    )
                })}
                {!tasksForTodolist.length && (
                    <div style={{ padding: 10, color: 'grey' }}>No task</div>
                )}
            </div>
            <ButtonGroup fullWidth>
                {renderFilterButton('all', 'All')}
                {renderFilterButton('active', 'Active')}
                {renderFilterButton('completed', 'Done')}
            </ButtonGroup>
        </div>
    )
})
