import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/index'
import serverMiddleware from './serverMiddleware';

export default createStore(reducer, applyMiddleware(thunk, serverMiddleware));
