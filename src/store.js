import {compose, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/index'
import socketMiddleware from './socketMiddleware'

const store = createStore(reducer, undefined, compose(applyMiddleware(thunk, socketMiddleware)));

export default store;
