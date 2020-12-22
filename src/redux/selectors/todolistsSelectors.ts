import { RootStateType } from '../reducers/rootReducer'
import { createSelector } from '@reduxjs/toolkit'

const getTodoLists = (state: RootStateType) => state.todoLists
export const todoListsSelector = createSelector(getTodoLists, (todoLists) => todoLists)
