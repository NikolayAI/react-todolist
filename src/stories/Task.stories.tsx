import React from 'react'
import { Task } from '../components/Task'
import { action } from '@storybook/addon-actions'
import { ReduxStoreProviderDecorator } from './ReduxStoreProviderDecorator'
import { TaskStatuses } from '../api/api'

export default {
    title: 'Task Component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
}

const changeTaskStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('Title changed')
const changeTaskCallback = action('Task Removed')

export const TaskBaseExample = (props: any) => {
    return (
        <>
            <Task
                taskId={'1'}
                todolistId={'todolist1'}
                taskTitle={'CSS'}
                status={TaskStatuses.Completed}
            />
            <Task
                taskId={'2'}
                todolistId={'todolist2'}
                taskTitle={'JS'}
                status={TaskStatuses.New}
            />
        </>
    )
}
