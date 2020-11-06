import {useDispatch} from "react-redux";
import {removeTaskTC, updateTaskTC} from "./state/tasks-reducer";
import React, {useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import {TaskStatuses} from "./api/todolists-api";

type TaskPropsType = {
    taskId: string
    todolistId: string
    taskTitle: string
    status: TaskStatuses
}
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch()

    const removeTask = useCallback(() => {
        dispatch(removeTaskTC(props.todolistId, props.taskId))
    }, [dispatch, props.taskId, props.todolistId])

    const onChangeStatusHandler =  useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskTC(props.todolistId, props.taskId, {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}))
    }, [dispatch, props.taskId, props.todolistId])

    const onChangeTitleHandler =  useCallback((title: string) => {
        dispatch(updateTaskTC(props.todolistId, props.taskId, {title}))
    }, [dispatch, props.todolistId, props.taskId])

    return (
        <div key={props.taskId} className={props.status === TaskStatuses.Completed ? 'is-done' : ''}
             style={{listStyleType: 'none'}}>
            <Checkbox color={"default"} onChange={onChangeStatusHandler} checked={props.status === TaskStatuses.Completed}/>
            <EditableSpan title={props.taskTitle} onChange={onChangeTitleHandler}/>
            <IconButton onClick={removeTask}><DeleteOutlineIcon/></IconButton>
        </div>
    )

})