import {combineReducers} from 'redux';
import connections from './connections';
import contestants from './contestants';
import displays from './displays';
import host from './host';

const quizMasterServer = combineReducers({
  connections,
  contestants,
  displays,
  host
});

export default quizMasterServer;
