import {actions} from '../constants';

const active = (state = false, action) =>
{
  if (action.type === actions.UPDATE_CONTESTANT) {
    return action.active;
  }

  return state;
}

export default active
