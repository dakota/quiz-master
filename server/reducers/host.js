import {connection} from '../actions';
import {CLASS_HOST} from '../constants';

const initialState = null

function host(state = initialState, action)
{
  switch (action.type) {
    case connection.HANDSHAKE:
      if (action.handshake.class !== CLASS_HOST) {
        return state;
      }

      return action.handshake._id;
    default:
      return state;
  }
}

export default host
