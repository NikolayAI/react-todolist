import * as tasksActions from '../../redux/reducers/tasksReducer'
import React, { useCallback } from 'react'
import { Checkbox, IconButton } from '@material-ui/core'
import { EditableSpan } from '../EditableSpan'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import { TaskStatuses } from '../../api/api'
import { useActions } from '../../utils/reduxUtils'

type TaskPropsType = {
    taskId: string
    todolistId: string
    taskTitle: string
    status: TaskStatuses
}
export const Task: React.FC<TaskPropsType> = React.memo(
    ({ status, taskId, taskTitle, todolistId }) => {
        const { removeTasks, updateTasks } = useActions(tasksActions)

        const handleClickRemoveTask = useCallback(() => {
            removeTasks({ todolistId, taskId })
        }, [removeTasks, taskId, todolistId])

        const handleChangeStatus = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                updateTasks({
                    todolistId: todolistId,
                    todolistTaskId: taskId,
                    model: {
                        status: e.currentTarget.checked
                            ? TaskStatuses.Completed
                            : TaskStatuses.New,
                    },
                })
            },
            [updateTasks, taskId, todolistId]
        )

        const handleChangeTitle = useCallback(
            (title: string) => {
                updateTasks({
                    todolistId: todolistId,
                    todolistTaskId: taskId,
                    model: { title },
                })
            },
            [updateTasks, todolistId, taskId]
        )

        return (
            <div
                key={taskId}
                className={status === TaskStatuses.Completed ? 'is-done' : ''}
                style={{ listStyleType: 'none' }}
            >
                <Checkbox
                    color={'default'}
                    onChange={handleChangeStatus}
                    checked={status === TaskStatuses.Completed}
                />
                <EditableSpan title={taskTitle} onChange={handleChangeTitle} />
                <IconButton onClick={handleClickRemoveTask}>
                    <DeleteOutlineIcon />
                </IconButton>
            </div>
        )
    }
)
