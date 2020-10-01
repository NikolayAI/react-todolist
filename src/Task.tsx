import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import React, {useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

type TaskPropsType = {
    taskId: string
    todolistId: string
    taskTitle: string
    isDone: boolean
}
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch()

    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(props.taskId, props.todolistId))
    }, [removeTaskAC, props.taskId, props.todolistId])

    const onChangeStatusHandler =  useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.taskId, e.currentTarget.checked, props.todolistId))
    }, [changeTaskStatusAC, props.taskId, props.todolistId])

    const onChangeTitleHandler =  useCallback((title: string) => {
        dispatch(changeTaskTitleAC(props.todolistId, props.taskId, title))
    }, [changeTaskTitleAC, props.todolistId, props.taskId])

    return (
        <div key={props.taskId} className={props.isDone ? 'is-done' : ''}
             style={{listStyleType: 'none'}}>
            <Checkbox color={"default"} onChange={onChangeStatusHandler} checked={props.isDone}/>
            <EditableSpan title={props.taskTitle} onChange={onChangeTitleHandler}/>
            <IconButton onClick={removeTask}><DeleteOutlineIcon/></IconButton>
        </div>
    )

})