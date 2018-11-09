export const connection = {
  HANDSHAKE: 'HANDSHAKE_CONNECTION',
  REMOVE: 'REMOVE_CONNECTION'
};

export const server = {
  START: 'START',
  STOP: 'STOP',
}

export const BUZZ = 'ACTION_BUZZ';
export const REMOVE_CONTESTANT = 'ACTION_REMOVE_CONTESTANT';
export const CHANGE_CONTESTANT_FIELD = 'ACTION_CHANGE_CONTESTANT_FIELD';
export const CLEAR_BUZZER = 'ACTION_CLEAR_BUZZER';
export const ANSWER = 'ACTION_ANSWER';
export const DISPLAY_UPDATED = 'ACTION_DISPLAY_UPDATED';
export const NEXT_QUESTION = 'ACTION_NEXT_QUESTION';
export const ENABLE_QUESTION = 'ACTION_ENABLE_QUESTION';
export const TIMER_STARTED = 'ACTION_TIMER_STARTED';
export const TIMER_STOPPED = 'ACTION_TIMER_STOPPED';
export const TIMER_TICK = 'ACTION_TIMER_TICK';

export function connectionHandshake(webSocketConnection, handshake) {
  return {type: connection.HANDSHAKE, handshake, connection: webSocketConnection}
}

export function removeConnection(_id)
{
  return {type: connection.REMOVE, _id}
}

export function startServer()
{
  return {type: server.START}
}

export function buzz(_id)
{
  return (dispatch) => {
    dispatch({type: BUZZ, _id});
    dispatch(doTimer(30));
  }
}

export function updateContestantField(_id, field, value)
{
  return {type: CHANGE_CONTESTANT_FIELD, _id, field, value}
}

export function clearBuzzer()
{
  return {type: CLEAR_BUZZER}
}

export function answer(correct)
{
    return {type: ANSWER, correct}
}

export function doTimer(timer)
{
  let timeRemaining = timer;

  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch({type: TIMER_TICK, timeRemaining});
      timeRemaining--;

      if (timeRemaining <= 0) {
        const state = getState();
        if (state.contestants.buzzed) {
          dispatch(answer(false));
        } else {
          dispatch(clearBuzzer());
        }

        return;
      }

      dispatch(doTimer(timeRemaining));
    }, 1000);
  }
}

export function nextQuestion()
{
  return (dispatch, getState) => {
    dispatch({type: NEXT_QUESTION});

    const state = getState();

    if (state.quiz.current.question !== 0) {
      dispatch(doTimer(15));
    }
  };
}
