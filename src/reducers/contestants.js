import {actions} from '../constants';

const initialState = {
  buzzed: false,
  correct: null,
  contestants: {}
}

function contestants(state = initialState, action)
{
  switch (action.type) {
    case actions.UPDATE_CONTESTANTS:
      return Object.assign({}, state, {
        buzzed: action.buzzed,
        contestants: action.contestants,
        correct: action.correct
      });
    case actions.UPDATE_CONTESTANT_FIELD:
      if (!state.contestants[action._id]) {
        return state;
      }

      let newState = Object.assign({}, state);
      newState.contestants[action._id][action.field] = action.value;

      return newState;
    default:
      return state;
  }
}

export default contestants
