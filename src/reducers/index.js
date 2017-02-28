import { combineReducers } from 'redux';
import connection from './connection';
import contestant from './contestant';
import contestants from './contestants';
import classReducer from './class';
import configured from './configured';
import id from './id';

const quizMasterApp = combineReducers({
  connection,
  contestant,
  contestants,
  class: classReducer,
  id,
  configured,
});

export default quizMasterApp;
