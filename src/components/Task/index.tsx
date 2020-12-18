import { removeTasks, updateTasks } from '../../redux/reducers/tasksReducer'
import React, { useCallback } from 'react'
import { Checkbox, IconButton } from '@material-ui/core'
import { EditableSpan } from '../EditableSpan'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import { TaskStatuses } from '../../api/api'
import { useAppDispatch } from '../../redux/store'

type TaskPropsType = {
    taskId: string
    todolistId: string
    taskTitle: string
    status: TaskStatuses
}
export const Task: React.FC<TaskPropsType> = React.memo(
    ({ status, taskId, taskTitle, todolistId }) => {
        const dispatch = useAppDispatch()

        const handleClickRemoveTask = useCallback(() => {
            dispatch(removeTasks({ todolistId, taskId }))
        }, [dispatch, taskId, todolistId])

        const handleChangeStatusHandler = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(
                    updateTasks({
                        todolistId: todolistId,
                        todolistTaskId: taskId,
                        model: {
                            status: e.currentTarget.checked
                                ? TaskStatuses.Completed
                                : TaskStatuses.New,
                        },
                    })
                )
            },
            [dispatch, taskId, todolistId]
        )

        const onChangeTitle = useCallback(
            (title: string) => {
                dispatch(
                    updateTasks({
                        todolistId: todolistId,
                        todolistTaskId: taskId,
                        model: { title },
                    })
                )
            },
            [dispatch, todolistId, taskId]
        )

        return (
            <div
                key={taskId}
                className={status === TaskStatuses.Completed ? 'is-done' : ''}
                style={{ listStyleType: 'none' }}
            >
                <Checkbox
                    color={'default'}
                    onChange={handleChangeStatusHandler}
                    checked={status === TaskStatuses.Completed}
                />
                <EditableSpan title={taskTitle} onChange={onChangeTitle} />
                <IconButton onClick={handleClickRemoveTask}>
                    <DeleteOutlineIcon />
                </IconButton>
            </div>
        )
    }
)
