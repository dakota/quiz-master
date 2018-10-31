import {buzzer, actions} from '../constants';

const initialState = {
  buzzer: buzzer.READY,
  color: '',
  score: 0,
  name: '',
};

function contestant(state = initialState, action)
{
  switch (action.type) {
    case actions.SET_NAME: {
      return Object.assign({}, state, {name: action.name});
    }
    case actions.UPDATE_CONTESTANT: {
      return Object.assign({}, state, action.contestant);
    }
    default:
      return state;
  }
}

export default contestant
