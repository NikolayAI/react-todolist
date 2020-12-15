import { RootStateType } from '../reducers/roootReducer'
import { createSelector } from '@reduxjs/toolkit'

const getTasksSelector = (state: RootStateType) => state.tasks
export const getTasks = (todolistId: string) =>
    createSelector(getTasksSelector, (tasks) => tasks[todolistId])
