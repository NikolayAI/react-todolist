import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Grid, IconButton} from '@material-ui/core';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";
import {addTaskAC, addTaskTC, fetchTasksTC} from "./state/tasks-reducer";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {FilterValuesType} from "./state/todolists-reducer";

type PropsType = {
    id: string
    title: string
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    changeTodolistTitle: (todoListId: string, title: string) => void
    filter: FilterValuesType
    removeTodoList: (todolistId: string) => void
}

export const TodoList = React.memo((props: PropsType) => {
    const dispatch = useDispatch()
    const tasks = useSelector<RootStateType, TaskType[]>(state => state.tasks[props.id])

    useEffect(() => {dispatch(fetchTasksTC(props.id))}, [])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(props.id, title))
    }, [addTaskTC, props.id])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.id, 'all')
        }, [props.id, props.changeFilter]
    )
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.id, 'active')
        }, [props.id, props.changeFilter]
    )
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.id, 'completed')
        }, [props.id, props.changeFilter]
    )
    const removeTodoList = useCallback(() => {
        props.removeTodoList(props.id)
        }, [props.id, props.removeTodoList]
    )
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
        }, [props.id, props.changeTodolistTitle]
    )

    let tasksForTodolist = tasks
    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div style={{position: 'relative'}}><IconButton style={{position: 'absolute', padding: '0', left: '0.5rem'}}
                                                        onClick={removeTodoList}><CancelPresentationIcon
            color={"action"}/></IconButton>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center">
                <h2><EditableSpan title={props.title} onChange={changeTodolistTitle}/></h2></Grid>
            <AddItemForm addItem={addTask}/>
            <div style={{paddingLeft: '0'}}>
                {
                    tasksForTodolist.map(t => {
                        return <Task taskId={t.id}
                                     todolistId={props.id}
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
                    <Button variant="contained" color={props.filter === 'all' ? 'secondary' : 'primary'}
                            onClick={onAllClickHandler}>All</Button>
                    <Button variant="contained" color={props.filter === 'active' ? 'secondary' : 'primary'}
                            onClick={onActiveClickHandler}>Active</Button>
                    <Button variant="contained" color={props.filter === 'completed' ? 'secondary' : 'primary'}
                            onClick={onCompletedClickHandler}>Completed</Button>
                </Grid>
            </ButtonGroup>

        </div>
    )
})

