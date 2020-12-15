import { RootStateType } from '../reducers/roootReducer'
import { createSelector } from '@reduxjs/toolkit'

const getTodoListsSelector = (state: RootStateType) => state.todoLists
export const getTodoLists = createSelector(getTodoListsSelector, (todoLists) => todoLists)
