import React from "react";
import {FilterValuesType, TaskType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, Grid, IconButton} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

type PropsType = {
    id: string
    title: string
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    changeTodolistTitle: (title: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todolistId: string) => void
}

export function TodoList(props: PropsType) {
    const dispatch = useDispatch()
    const tasks = useSelector<RootStateType, TaskType[]>(state => state.tasks[props.id])

    const addTask = (title: string) => dispatch(addTaskAC(title, props.id))

    const onAllClickHandler = () => props.changeFilter(props.id, 'all')
    const onActiveClickHandler = () => props.changeFilter(props.id, 'active')
    const onCompletedClickHandler = () => props.changeFilter(props.id, 'completed')
    const removeTodoList = () => props.removeTodoList(props.id)
    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.id)

    let tasksForTodolist = tasks
    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
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
                        const removeTask = () => dispatch(removeTaskAC(t.id, props.id))
                        const onChangeStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked,props.id))
                        }
                        const onChangeTitleHandler = (title: string) => {
                            dispatch(changeTaskTitleAC(props.id, t.id, title))
                        }

                        return (
                            <div key={t.id} className={t.isDone ? 'is-done' : ''}
                                style={{listStyleType: 'none'}}>
                                <Checkbox color={"default"} onChange={onChangeStatusHandler} checked={t.isDone}/>
                                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                                <IconButton onClick={removeTask}><DeleteOutlineIcon/></IconButton>
                            </div>
                        )
                    })
                }
            </div>
                <ButtonGroup style={{width: '100%',minWidth: '240px'}}>
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
}

