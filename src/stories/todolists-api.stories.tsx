import React, { useEffect, useState } from 'react'
import { todolistsApi } from '../api/todolistsApi'

export default {
    title: 'API',
}

const settings = {
    withCredentials: true,
    headers: {
        'api-key': 'f42d8ba2-6f4b-4b16-a713-ca3fc2cb7707',
    },
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolists()
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi
            .createTodolist(`NewTodolist ${new Date().getSeconds()}`)
            .then((response) => setState(response.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '40d089cf-d97b-4686-a15f-13d12c260df6'
        todolistsApi
            .deleteTodolists(todolistId)
            .then((response) => setState(response.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '19bee6df-b3a9-4379-8da7-5aebca462faa'
        todolistsApi
            .updateTodolist(todolistId, `UpdatedTodolist ${new Date().getSeconds()}`)
            .then((response) => setState(response.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')

    const getTasks = () => {
        todolistsApi.getTasks(todolistId)
    }

    return (
        <div>
            {' '}
            {JSON.stringify(state)}
            <div>
                <div>
                    <input
                        placeholder={'todolistId'}
                        value={todolistId}
                        onChange={(e) => setTodolistId(e.currentTarget.value)}
                    />
                    <button onClick={getTasks}>get tasks</button>
                </div>
            </div>
        </div>
    )
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTask = () => {
        todolistsApi
            .deleteTask(todolistId, taskId)
            .then((response) => setState(response.data))
    }

    return (
        <div>
            {' '}
            {JSON.stringify(state)}
            <div>
                <input
                    placeholder={'taskId'}
                    value={taskId}
                    onChange={(e) => setTaskId(e.currentTarget.value)}
                />
                <input
                    placeholder={'todolistId'}
                    value={todolistId}
                    onChange={(e) => setTodolistId(e.currentTarget.value)}
                />
                <button onClick={deleteTask}>delete task</button>
            </div>
        </div>
    )
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const createTask = () => {
        todolistsApi
            .createTask(todolistId, taskTitle)
            .then((response) => setState(response.data))
    }

    return (
        <div>
            {' '}
            {JSON.stringify(state)}
            <div>
                <input
                    placeholder={'taskTitle'}
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.currentTarget.value)}
                />
                <input
                    placeholder={'todolistId'}
                    value={todolistId}
                    onChange={(e) => setTodolistId(e.currentTarget.value)}
                />
                <button onClick={createTask}>create task</button>
            </div>
        </div>
    )
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskDescription, setTaskDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const updateTask = () => {
        todolistsApi
            .updateTask(todolistId, taskId, {
                deadline: '',
                priority: priority,
                description: taskDescription,
                startDate: '',
                status: status,
                title: taskTitle,
            })
            .then((response) => setState(response.data))
    }

    return (
        <div>
            {' '}
            {JSON.stringify(state)}
            <div>
                <input
                    placeholder={'taskId'}
                    value={taskId}
                    onChange={(e) => setTaskId(e.currentTarget.value)}
                />
                <input
                    placeholder={'taskTitle'}
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.currentTarget.value)}
                />
                <input
                    placeholder={'todolistId'}
                    value={todolistId}
                    onChange={(e) => setTodolistId(e.currentTarget.value)}
                />
                <input
                    placeholder={'taskDescription'}
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.currentTarget.value)}
                />
                <input
                    placeholder={'status'}
                    value={status}
                    type={'number'}
                    onChange={(e) => setStatus(+e.currentTarget.value)}
                />
                <input
                    placeholder={'priority'}
                    value={priority}
                    type={'number'}
                    onChange={(e) => setPriority(+e.currentTarget.value)}
                />
                <input
                    placeholder={'startDate'}
                    value={startDate}
                    onChange={(e) => setStartDate(e.currentTarget.value)}
                />
                <input
                    placeholder={'deadline'}
                    value={deadline}
                    onChange={(e) => setDeadline(e.currentTarget.value)}
                />
                <button onClick={updateTask}>update task</button>
            </div>
        </div>
    )
}
