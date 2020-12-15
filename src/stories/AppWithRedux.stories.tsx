import React from 'react'
import { App } from '../app'
import { ReduxStoreProviderDecorator } from './ReduxStoreProviderDecorator'

export default {
    title: 'App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator],
}

export const AppWithReduxBaseExample = () => {
    return <App demo={true} />
}
