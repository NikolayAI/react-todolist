import React from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, Grid, IconButton} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListId: string) => void
    changeTodolistTitle: (title: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todolistId: string) => void
}

export function TodoList(props: PropsType) {
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
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
            <ul style={{paddingLeft: '0'}}>
                {
                    props.tasks.map(t => {
                        const removeTask = () => props.removeTask(t.id, props.id)
                        const onChangeStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (title: string) => {
                            props.changeTaskTitle(t.id, title, props.id)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}
                                style={{listStyleType: 'none'}}>
                                <Checkbox color={"default"} onChange={onChangeStatusHandler} checked={t.isDone}/>
                                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                                <IconButton onClick={removeTask}><DeleteOutlineIcon/></IconButton>
                            </li>
                        )
                    })
                }
            </ul>
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

