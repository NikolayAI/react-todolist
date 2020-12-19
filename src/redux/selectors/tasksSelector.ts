import { RootStateType } from '../reducers/roootReducer'
import { createSelector } from '@reduxjs/toolkit'

const getTasks = (state: RootStateType) => state.tasks
export const tasksSelector = (todolistId: string) => {
    return createSelector(getTasks, (tasks) => tasks[todolistId])
}
