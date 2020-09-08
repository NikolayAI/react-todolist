import React from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/><button onClick={removeTodoList}>x</button></h3>
            <AddItemForm addItem={addTask}/>
            <ul>
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
                            <li key={t.id} className={t.isDone ? 'is-done' : ''} >
                                <input type="checkbox" onChange={onChangeStatusHandler} checked={t.isDone}/>
                                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                                <button onClick={removeTask}>x
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

