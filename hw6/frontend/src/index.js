require('expose?$!expose?jQuery!jquery')
require("bootstrap-webpack")

import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import Reducer from './reducers'
import APP from './components/app'
require('./styles.css')


// const logger = createLogger()
// const store = createStore(Reducer, applyMiddleware(logger, thunkMiddleware))
const store = createStore(Reducer, applyMiddleware(thunkMiddleware))

render(
    <Provider store={store}>
        <APP/>
    </Provider>,
    document.getElementById('app')
)