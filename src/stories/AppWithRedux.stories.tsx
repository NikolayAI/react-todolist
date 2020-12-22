import React from 'react'
import { App } from '../app'
import { ReduxStoreProviderDecorator } from './ReduxStoreProviderDecorator'
import { HashRouter } from 'react-router-dom'

export default {
    title: 'App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator],
}

export const AppWithReduxBaseExample = () => {
    return (
        <HashRouter>
            <App />
        </HashRouter>
    )
}
