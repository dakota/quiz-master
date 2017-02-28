import { CLASS_NONE, actions} from '../constants';

const classReducer = (state = CLASS_NONE, action) =>
{
  switch (action.type) {
    case actions.SET_CLASS:
      return action.class
    default:
      return state
  }
}

export default classReducer
