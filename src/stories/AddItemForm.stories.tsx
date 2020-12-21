import React from 'react'
import { AddItemForm } from '../components/AddItemForm'
import { action } from '@storybook/addon-actions'

export default {
    title: 'AddItemForm Component',
    component: AddItemForm,
}

const callback = action('Button "add" was pressed inside the form')
const asyncCallback = async (...params: Array<any>) => {
    callback(...params)
}

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm onAddItem={asyncCallback} />
}

export const AddItemFormDisableExample = (props: any) => {
    return <AddItemForm disabled={true} onAddItem={asyncCallback} />
}
