import {connection} from '../actions';
import {CLASS_DISPLAY} from '../constants';

const initialState = []

function displays(state = initialState, action)
{
  switch (action.type) {
    case connection.HANDSHAKE:
      if (action.handshake.class !== CLASS_DISPLAY) {
        return state;
      }

      state.push(action.handshake._id);
      return state;
    default:
      return state;
  }
}

export default displays
