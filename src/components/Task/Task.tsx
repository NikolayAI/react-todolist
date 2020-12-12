import { useDispatch } from "react-redux";
import { removeTaskTC, updateTaskTC } from "../../store/tasks-reducer";
import React, { useCallback } from "react";
import { Checkbox, IconButton } from "@material-ui/core";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { TaskStatuses } from "../../api/todolistsApi";

type TaskPropsType = {
  taskId: string;
  todolistId: string;
  taskTitle: string;
  status: TaskStatuses;
};
export const Task: React.FC<TaskPropsType> = React.memo(
  ({ status, taskId, taskTitle, todolistId }) => {
    const dispatch = useDispatch();

    const handleClickRemoveTask = useCallback(() => {
      dispatch(removeTaskTC(todolistId, taskId));
    }, [dispatch, taskId, todolistId]);

    const handleChangeStatusHandler = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
          updateTaskTC(todolistId, taskId, {
            status: e.currentTarget.checked
              ? TaskStatuses.Completed
              : TaskStatuses.New,
          })
        );
      },
      [dispatch, taskId, todolistId]
    );

    const onChangeTitle = useCallback(
      (title: string) => {
        dispatch(updateTaskTC(todolistId, taskId, { title }));
      },
      [dispatch, todolistId, taskId]
    );

    return (
      <div
        key={taskId}
        className={status === TaskStatuses.Completed ? "is-done" : ""}
        style={{ listStyleType: "none" }}
      >
        <Checkbox
          color={"default"}
          onChange={handleChangeStatusHandler}
          checked={status === TaskStatuses.Completed}
        />
        <EditableSpan title={taskTitle} onChange={onChangeTitle} />
        <IconButton onClick={handleClickRemoveTask}>
          <DeleteOutlineIcon />
        </IconButton>
      </div>
    );
  }
);
