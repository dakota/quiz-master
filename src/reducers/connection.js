import {NOT_CONNECTED, actions} from '../constants';

const initialState = {
  id: null,
  connected: NOT_CONNECTED,
  retryTimer: 0,
}

function connection(state = initialState, action)
{
  switch (action.type) {
    case actions.CONNECT_STATUS:
      return Object.assign({}, state, {
        connected: action.status
      });
    case actions.UPDATE_TIMER:
      return Object.assign({}, state, {
        retryTimer: action.timer
      });
    case actions.SET_ID:
      return Object.assign({}, state, {
        id: action.id
      });
    default:
      return state;
  }
}

export default connection
