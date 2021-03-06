import http from 'http';
import {server as WebSocketServer, connection as WebSocketConnection} from 'websocket';

import {
  connection,
  server,
  connectionHandshake,
  removeConnection,
  buzz,
  BUZZ,
  REMOVE_CONTESTANT,
  CHANGE_CONTESTANT_FIELD,
  updateContestantField,
  clearBuzzer,
  answer,
  CLEAR_BUZZER,
  ANSWER,
  DISPLAY_UPDATED,
  nextQuestion,
  NEXT_QUESTION,
  TIMER_TICK
} from './actions';
import {
  msg,
  CLASS_CONTESTANT
} from './constants';

const serverMiddleware = (function ()
{
  var wsServer = null;
  var httpServer = null;
  var handshakeTimer = null;

  const onClose = (_id, store) => evt =>
  {
    console.log((
        new Date()
      ) + ' Disconnected.');
    store.dispatch(removeConnection(_id));
  }

  const onMessage = (_id, store) => (message) =>
  {
    const command = JSON.parse(message.utf8Data);

    console.log((new Date()) + ' Message received of type ' + command.msg + ' from ' + _id);

    switch (command.msg) {
      case msg.BUZZED:
        store.dispatch(buzz(_id));
        break;
      case msg.UPDATE_CONTESTANT_FIELD:
        if (_id !== store.getState().host) {
          return;
        }

        store.dispatch(updateContestantField(command.contestantId, command.field, command.value));
        break;
      case msg.CLR_BUZZED:
        if (_id !== store.getState().host) {
          return;
        }

        store.dispatch(clearBuzzer());
        break;
      case msg.ANSWER:
        if (_id !== store.getState().host) {
          return;
        }

        store.dispatch(answer(command.correct));
        break;
      case msg.NEXT_QUESTION:
        if (_id !== store.getState().host) {
          return;
        }

        store.dispatch(nextQuestion());
        break;
    }
  }

  const onHandshake = (connection, store) => message =>
  {
    const handshake = JSON.parse(message.utf8Data);

    if (handshake.msg !== msg.HANDSHAKE && !handshake._id && !handshake.class) {
      //Not a valid handshake
      connection.drop(WebSocketConnection.CLOSE_REASON_INVALID_DATA, 'Not a valid handshake');
    }

    clearTimeout(handshakeTimer);

    console.log((new Date()) + ' Handshake with ' + handshake._id + ' who is a ' + handshake.class);

    store.dispatch(connectionHandshake(connection, handshake));

    connection.removeAllListeners('message');
    connection
      .on('message', onMessage(handshake._id, store))
      .on('close', onClose(handshake._id, store));
  }

  const onRequest = (store) => request =>
  {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }

    try {
      let connection = request.accept('quiz-master', request.origin);

      console.log((new Date()) + ' Connected.');

      connection.on('message', onHandshake(connection, store));

      handshakeTimer = setTimeout(() => {
        connection.drop(WebSocketConnection.CLOSE_REASON_POLICY_VIOLATION, 'No handshake received.');
      }, 5000);

      return;
    } catch (Error) {
      console.error(Error);
    }
  }

  const sendMessage = (wsConnection, msgType, data, id) =>
  {
    if (wsConnection.state !== 'open') {
      return;
    }

    wsConnection.send(JSON.stringify({
      msg: msgType,
      _id: id,
      ...data
    }));
    console.log((new Date()) + ' ' + msgType + ' sent to ' + id);
  }

  const originIsAllowed = origin =>
  {
    // put logic here to detect whether the specified origin is allowed.
    return true;
  }

  const updateDisplay = (state, _id, forceQuestion = false) =>
  {
    const connection = state.connections[_id];
    sendMessage(connection, msg.UPDATE_CONTESTANTS, {
      contestants: state.contestants.contestants,
      buzzed: state.contestants.buzzed,
      timer: state.quiz.timer,
      correct: state.contestants.correct
    }, _id);

    if (forceQuestion === true || state.quiz.changed) {
      sendMessage(connection, msg.QUESTION, {
        end: state.quiz.end,
        roundNumber: state.quiz.current.round,
        name: !state.quiz.end && state.quiz.current.round !== 0 ? state.quiz.questions[state.quiz.current.round - 1].name : '',
        questionNumber: state.quiz.current.question,
        question: state.quiz.end || state.quiz.current.round === 0 || state.quiz.current.question === 0 ? null : state.quiz.questions[state.quiz.current.round - 1].questions[state.quiz.current.question - 1],
      }, _id);
    }
  }

  const updateDisplays = store =>
  {
    const state = store.getState();

    state.displays.forEach((_id) =>
    {
      updateDisplay(state, _id);
    });

    if (state.host) {
      updateDisplay(state, state.host);
    }

    store.dispatch({type: DISPLAY_UPDATED});
  }

  const updateContestant = (state, _id) => {
    sendMessage(state.connections[_id], msg.UPDATE_CONTESTANT, {
      contestant: state.contestants.contestants[_id],
      active: state.quiz.end === false && state.quiz.current.round !== 0 && state.quiz.current.question !== 0,
      timer: state.quiz.timer
    }, _id);
  }

  return store => next => action =>
  {
    let state;
    let result;
    switch (action.type) {

      //The user wants us to connect
      case server.START:
        if (httpServer != null) {
          httpServer.close();
        }
        if (wsServer != null) {
          wsServer.close();
        }

        httpServer = http.createServer((request, response) =>
        {
          console.log((
              new Date()
            ) + ' Received request for ' + request.url);
          response.writeHead(404);
          response.end();
        });

        httpServer.listen(8080, '0.0.0.0', () =>
        {
          console.log((
              new Date()
            ) + ' Server is listening on port 8080');
        });

        wsServer = new WebSocketServer({
          httpServer: httpServer,
          autoAcceptConnections: false
        });

        wsServer.on('request', onRequest(store));

        break;

      //The user wants us to disconnect
      case server.STOP:
        if (wsServer != null) {
          wsServer.close();
        }
        if (httpServer != null) {
          httpServer.close();
        }

        wsServer = null;
        httpServer = null;
        break;

      //Send the 'BUZZED' action down the websocket to the server
      case BUZZ:
      case connection.REMOVE:
      case REMOVE_CONTESTANT:
      case CLEAR_BUZZER:
      case ANSWER:
      case NEXT_QUESTION:
      case TIMER_TICK:
        result = next(action);

        state = store.getState();

        for (let _id in state.contestants.contestants) {
          updateContestant(state, _id);
        }

        updateDisplays(store);

        return result;
      case CHANGE_CONTESTANT_FIELD:
        result = next(action);

        state = store.getState();
        if (action._id) {
          updateContestant(state, action._id);
        }
        updateDisplays(store);

        return result;
      case connection.HANDSHAKE:
        result = next(action);

        state = store.getState();
        const _id = action.handshake._id;

        if (action.handshake.class === CLASS_CONTESTANT) {
          updateContestant(state, _id);
          updateDisplays(store);
        }

        if (action.handshake.class !== CLASS_CONTESTANT) {
          updateDisplay(state, _id, true);
        }

        return result;

      //This action is irrelevant to us, pass it on to the next middleware
      default:
        return next(action);
    }
  }

})();

export default serverMiddleware
