import {
  CONNECTED,
  CONNECTING,
  NOT_CONNECTED,
  websocket,
  actions,
  socketActions
} from './constants';

let timer = 0;

export function buzz()
{
  return {type: actions.BUZZ}
}

export function connect(url = websocket.URL, protocol = websocket.PROTOCOL)
{
    clearTimeout(timer);
    return {type: socketActions.CONNECT, url, protocol};
}

export function connecting ()
{
  return {type: actions.CONNECT_STATUS, status: CONNECTING}
}

export function connected ()
{
  return {type: actions.CONNECT_STATUS, status: CONNECTED}
}

export function disconnected ()
{
  return {type: actions.CONNECT_STATUS, status: NOT_CONNECTED}
}

export function updateTimer(timer)
{
  return {type: actions.UPDATE_TIMER, timer}
}

export function retryConnection (timeout) {
  let timeRemaining = timeout ;
  return (dispatch) => {
    timer = setTimeout(() => {
      timeRemaining -= 1;
      if (timeRemaining <= 0) {
        dispatch(connect());
      } else {
        dispatch(updateTimer(timeRemaining));
        dispatch(retryConnection(timeRemaining));
      }
    }, 1000);
  }
};

export function setClass (newClass)
{
  return {type: actions.SET_CLASS, class: newClass};
}

export function setName (name)
{
  return {type: actions.SET_NAME, name};
}

export function configure(className, name = null)
{
  return (dispatch) => {
    dispatch(setClass(className));
    if (name) {
      dispatch(setName(name));
    }
    dispatch(configured());
    dispatch(connect());
  }
}

export function configured()
{
  return {type: actions.CONFIGURED}
}

export function updateContestants(contestants, buzzed, correct)
{
  return {type: actions.UPDATE_CONTESTANTS, contestants, buzzed, correct}
}

export function updateContestant(_id, contestant, active, store = true)
{
  return {type: actions.UPDATE_CONTESTANT, _id, contestant, active, store}
}

export function updateContestantField(_id, field, value, store = true)
{
  return {type: actions.UPDATE_CONTESTANT_FIELD, _id, field, value, store}
}

export function clearBuzzers()
{
  return {type: actions.CLEAR_BUZZERS}
}

export function correctAnswer()
{
  return {type: actions.ANSWER, correct: true}
}

export function incorrectAnswer()
{
  return {type: actions.ANSWER, correct: false}
}

export function setQuestion(roundName, roundNumber, questionNumber, question, end)
{
  return {type: actions.QUESTION, roundName, roundNumber, questionNumber, question, end}
}

export function nextQuestion()
{
  return {type: actions.NEXT_QUESTION}
}
