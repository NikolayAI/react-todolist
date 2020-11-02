import React, {useCallback, useEffect} from "react"
import {AddItemForm} from "./AddItemForm"
import {EditableSpan} from "./EditableSpan"
import {Button, ButtonGroup, Grid, IconButton} from '@material-ui/core'
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation'
import {useDispatch, useSelector} from "react-redux"
import {RootStateType} from "./state/store"
import {addTaskTC, fetchTasksTC} from "./state/tasks-reducer"
import {Task} from "./Task"
import {TaskStatuses, TaskType} from "./api/todolists-api"
import {FilterValuesType, TodolistDomainType} from "./state/todolists-reducer"

type PropsType = {
    todolist: TodolistDomainType
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    changeTodolistTitle: (todoListId: string, title: string) => void
    removeTodoList: (todolistId: string) => void
    demo?: boolean
}

export const TodoList = React.memo(({demo = false, ...props}: PropsType) => {
    const dispatch = useDispatch()
    const tasks = useSelector<RootStateType, TaskType[]>(state => state.tasks[props.todolist.id])

    useEffect(() => {
        if (demo) return
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(props.todolist.id, title))
    }, [addTaskTC, props.todolist.id])

    const onAllClickHandler = useCallback(() => {
            props.changeFilter(props.todolist.id, 'all')
        }, [props.todolist.id, props.changeFilter]
    )
    const onActiveClickHandler = useCallback(() => {
            props.changeFilter(props.todolist.id, 'active')
        }, [props.todolist.id, props.changeFilter]
    )
    const onCompletedClickHandler = useCallback(() => {
            props.changeFilter(props.todolist.id, 'completed')
        }, [props.todolist.id, props.changeFilter]
    )
    const removeTodoList = useCallback(() => {
            props.removeTodoList(props.todolist.id)
        }, [props.todolist.id, props.removeTodoList]
    )
    const changeTodolistTitle = useCallback((title: string) => {
            props.changeTodolistTitle(props.todolist.id, title)
        }, [props.todolist.id, props.changeTodolistTitle]
    )

    let tasksForTodolist = tasks
    if (props.todolist.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div style={{position: 'relative'}}>
            <IconButton
                disabled={props.todolist.entityStatus === 'loading'}
                style={{position: 'absolute', padding: '0', left: '0.5rem'}}
                onClick={removeTodoList}><CancelPresentationIcon
                color={"action"}/>
            </IconButton>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center">
                <h2><EditableSpan title={props.todolist.title} onChange={changeTodolistTitle}/></h2></Grid>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
            <div style={{paddingLeft: '0'}}>
                {
                    tasksForTodolist.map(t => {
                        return <Task taskId={t.id}
                                     todolistId={props.todolist.id}
                                     taskTitle={t.title}
                                     status={t.status}
                                     key={t.id}/>
                    })
                }
            </div>
            <ButtonGroup style={{width: '100%', minWidth: '240px'}}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <Button variant="contained" color={props.todolist.filter === 'all' ? 'secondary' : 'primary'}
                            onClick={onAllClickHandler}>All</Button>
                    <Button variant="contained" color={props.todolist.filter === 'active' ? 'secondary' : 'primary'}
                            onClick={onActiveClickHandler}>Active</Button>
                    <Button variant="contained" color={props.todolist.filter === 'completed' ? 'secondary' : 'primary'}
                            onClick={onCompletedClickHandler}>Completed</Button>
                </Grid>
            </ButtonGroup>

        </div>
    )
})

