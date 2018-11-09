import {actions} from '../constants';

const timer = (state = false, action) =>
{
  if (action.type === actions.UPDATE_CONTESTANT || action.type === actions.UPDATE_CONTESTANTS) {
    return action.timer;
  }

  return state;
};

export default timer
