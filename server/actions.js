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
export const TIMER_STARTED = 'ACTION_TIMER_STARTED';
export const TIMER_STOPPED = 'ACTION_TIMER_STOPPED';
export const TIMER_TICK = 'ACTION_TIMER_TICK';

let timerReference;

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
  return (dispatch, getState) => {
    const state = getState();

    if (state.contestants.buzzee !== null) {
      return;
    }

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
  clearTimeout(timerReference);

  return (dispatch) => {
    dispatch({type: CLEAR_BUZZER});
    dispatch({type: TIMER_TICK, timeRemaining: 0});
  }

}

export function answer(correct)
{
  clearTimeout(timerReference);

  return (dispatch) => {
    dispatch({type: ANSWER, correct});
    dispatch({type: TIMER_TICK, timeRemaining: 0});
  }
}

export function doTimer(timer)
{
  let timeRemaining = timer;
  clearTimeout(timerReference);

  return (dispatch, getState) => {
    dispatch({type: TIMER_TICK, timeRemaining});

    if (timeRemaining <= 0) {
      const state = getState();
      if (state.contestants.buzzed) {
        dispatch(answer(false));
      } else {
        dispatch(clearBuzzer());
      }

      return;
    }

    timerReference = setTimeout(() => {
      timeRemaining--;
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
      clearTimeout(timerReference);
      dispatch(doTimer(15));
    }
  };
}
