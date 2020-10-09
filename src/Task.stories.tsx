import React from "react";
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

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
            <Task taskId={'1'} todolistId={'todolist1'} taskTitle={'CSS'} isDone={true}/>
            <Task taskId={'2'} todolistId={'todolist2'} taskTitle={'JS'} isDone={false}/>
        </>
    )
}