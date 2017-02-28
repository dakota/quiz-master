import {actions} from '../constants';

const configured = (state = false, action) =>
{
  switch (action.type) {
    case actions.CONFIGURED:
      return true;
    default:
      return state;
  }
}

export default configured
