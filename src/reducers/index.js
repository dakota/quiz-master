import { combineReducers } from 'redux';
import connection from './connection';
import contestant from './contestant';
import contestants from './contestants';
import classReducer from './class';
import configured from './configured';
import id from './id';
import question from './question';

const quizMasterApp = combineReducers({
  connection,
  contestant,
  contestants,
  class: classReducer,
  id,
  configured,
  question
});

export default quizMasterApp;
