import {connection} from '../actions';

const initialState = {}

function connections(state = initialState, action)
{
  switch (action.type) {
    case connection.HANDSHAKE:
      const newConnection = {};
      newConnection[action.handshake._id] = action.connection;
      return Object.assign({}, state, newConnection);
    default:
      return state;
  }
}

export default connections
