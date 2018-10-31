import {compose, createStore, applyMiddleware} from 'redux'
import {autoRehydrate} from 'redux-persist'
import thunk from 'redux-thunk'
import reducer from './reducers/index'
import socketMiddleware from './socketMiddleware'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk, socketMiddleware), autoRehydrate({log: true})));

export default store;
