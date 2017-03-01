import {combineReducers} from 'redux';
import connections from './connections';
import contestants from './contestants';
import displays from './displays';
import host from './host';
import quiz from './quiz';

const quizMasterServer = combineReducers({
  connections,
  contestants,
  displays,
  host,
  quiz
});

export default quizMasterServer;
