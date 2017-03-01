import {connection, BUZZ, REMOVE_CONTESTANT, CHANGE_CONTESTANT_FIELD, CLEAR_BUZZER, ANSWER, NEXT_QUESTION} from '../actions';
import {CLASS_CONTESTANT, buzzer, COLORS} from '../../src/constants';

const initialState = {
  buzzed: false,
  buzzee: null,
  correct: null,
  incorrects: [],
  contestants: {}
}

let colorIndex = 0;

function getNextColor()
{
  return COLORS[colorIndex++];
}

function buzzBuzzer(newState, id)
{
  newState.contestants[id].buzzer = buzzer.BUZZED;
}

function freezeBuzzer(newState, id)
{
  newState.contestants[id].buzzer = buzzer.FROZEN;
}

function resetBuzzer(newState, id)
{
  newState.contestants[id].buzzer = buzzer.READY;
}

function contestants(state = initialState, action)
{
  const newState = Object.assign({}, state);

  switch (action.type) {
    case connection.HANDSHAKE:
    {
      if (action.handshake.class !== CLASS_CONTESTANT) {
        return state;
      }
      const defaults = {
        name: action.handshake.name,
        buzzer: state.buzzed ? buzzer.FROZEN : buzzer.READY,
        connected: true,
        score: 0,
      };
      if (!newState.contestants[action.handshake._id]) {
        newState.contestants[action.handshake._id] = Object.assign({}, defaults, {
          _id: action.handshake._id,
          color: getNextColor()
        });
      } else {
        newState.contestants[action.handshake._id].buzzer = defaults.buzzer;
        newState.contestants[action.handshake._id].connected = true;
      }

      return newState;
    }
    case connection.REMOVE:
      if (!state.contestants[action._id]) {
        return state;
      }

      newState.contestants[action._id].connected = false;

      if (state.contestants[action._id].buzzer !== buzzer.BUZZED) {
        return newState;
      }

      newState.buzzed = false;
      newState.buzzee = null;
      for (let _id in newState.contestants) {
        resetBuzzer(newState, _id);
      }

      return newState;
    case REMOVE_CONTESTANT:
      delete newState.contestants[action._id];

      return newState;
    case BUZZ:
      newState.buzzed = true;
      newState.buzzee = action._id;
      buzzBuzzer(newState, action._id);

      for (let _id in newState.contestants) {
        if (_id === action._id || !newState.contestants[_id]) {
          continue;
        }
        freezeBuzzer(newState, _id);
      }

      return newState;
    case CHANGE_CONTESTANT_FIELD:
      if (!state.contestants[action._id]) {
        return state;
      }

      newState.contestants[action._id][action.field] = action.value;

      return newState;
    case CLEAR_BUZZER:
      newState.buzzed = false;
      newState.buzzee = null;
      newState.incorrects = [];
      for (let _id in newState.contestants) {
        resetBuzzer(newState, _id);
      }

      return newState;
    case ANSWER:
      const buzzee = newState.buzzee;

      if (action.correct) {
        newState.incorrects = [];
        newState.contestants[buzzee].score += 1;
        newState.correct = buzzee;

        for (let _id in newState.contestants) {
          freezeBuzzer(newState, _id);
        }

        return newState;
      }

      newState.incorrects.push(buzzee);
      newState.buzzed = false;
      newState.buzzee = null;
      for (let _id in newState.contestants) {
        if (_id === buzzee || newState.incorrects.indexOf(_id) !== -1) {
          freezeBuzzer(newState, _id);
          continue;
        }
        resetBuzzer(newState, _id);
      }

      return newState;
    case NEXT_QUESTION:
      newState.correct = null;
      newState.buzzed = false;
      newState.buzzee = null;
      for (let _id in newState.contestants) {
        resetBuzzer(newState, _id);
      }

      return newState;
    default:
      return state;
  }
}

export default contestants
