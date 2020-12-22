import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app'
import { store } from './app/store'

const render = () => {
    return ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    )
}

render()

if (module.hot) {
    module.hot.accept('./app', render)
}

serviceWorker.unregister()
