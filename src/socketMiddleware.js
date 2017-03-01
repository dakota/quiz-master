import {
  connected,
  disconnected,
  connecting,
  retryConnection,
  updateContestants,
  updateContestant,
  setQuestion
} from './actions';
import {
  msg,
  socketActions,
  actions,
  CLASS_CONTESTANT,
} from '../src/constants';

const socketMiddleware = (function ()
{
  var socket = null;
  var retryCount = 0;

  const onOpen = (ws, store, token) => evt =>
  {
    //Send a handshake, or authenticate with remote end
    retryCount = 0;

    const state = store.getState();
    let handshake = {
      msg: msg.HANDSHAKE,
      _id: state.id,
      class: state.class,
    };

    if (state.class === CLASS_CONTESTANT) {
      handshake.name = state.contestant.name;
    }

    socket.send(JSON.stringify(handshake));

    //Tell the store we're connected
    store.dispatch(connected());
  }

  const onClose = (ws, store) => evt =>
  {
    //Tell the store we've disconnected
    store.dispatch(disconnected());

    retryCount++;
    store.dispatch(retryConnection(retryCount * 30))
  }

  const onMessage = (ws, store) => evt =>
  {
    const state = store.getState();
    const command = JSON.parse(evt.data);

    if (!command._id || state.id !== command._id) {
      return;
    }

    console.log('Message received of type ' + command.msg);

    switch (command.msg) {
      case msg.UPDATE_CONTESTANTS:
        if (state.class === CLASS_CONTESTANT) {
          break;
        }
        store.dispatch(updateContestants(command.contestants, command.buzzed, command.correct));
        break;
      case msg.UPDATE_CONTESTANT:
        if (state.class !== CLASS_CONTESTANT) {
          break;
        }
        store.dispatch(updateContestant(command._id, command.contestant, false));
        break;
      case msg.QUESTION: {
        store.dispatch(setQuestion(command.name, command.roundNumber, command.questionNumber, command.question));
        console.log(command);
        break;
      }
      default:
        console.log("Received unknown message type: '" + command.msg + "'");
        break;
    }
  }

  return store => next => action =>
  {
    switch (action.type) {

      //The user wants us to connect
      case socketActions.CONNECT:
        if (!store.getState().configured) {
          throw new Error('Not configured yet');
        }

        //Start a new connection to the server
        if (socket != null) {
          socket.close();
        }
        //Send an action that shows a "connecting..." status for now
        store.dispatch(connecting());

        //Attempt to connect (we could send a 'failed' action on error)
        socket = new WebSocket(action.url, action.protocol);
        socket.onmessage = onMessage(socket, store);
        socket.onclose = onClose(socket, store);
        socket.onopen = onOpen(socket, store, action.token);

        break;

      //The user wants us to disconnect
      case socketActions.DISCONNECT:
        if (socket != null) {
          socket.close();
        }
        socket = null;
        break;

      //Send the 'BUZZED' action down the websocket to the server
      case actions.BUZZ:
        socket.send(JSON.stringify({
          msg: msg.BUZZED
        }));

        return next(action);

      case actions.UPDATE_CONTESTANT_FIELD: {
        const result = next(action);

        if (action.store) {
          socket.send(JSON.stringify({
            msg: msg.UPDATE_CONTESTANT_FIELD,
            contestantId: action._id,
            field: action.field,
            value: action.value
          }));
        }

        return result;
      }
      case actions.CLEAR_BUZZERS:
        socket.send(JSON.stringify({
          msg: msg.CLR_BUZZED
        }));

        break;
      case actions.ANSWER:
        socket.send(JSON.stringify({
          msg: msg.ANSWER,
          correct: action.correct
        }));

        break;

      case actions.NEXT_QUESTION:
        socket.send(JSON.stringify({
          msg: msg.NEXT_QUESTION
        }));

        break;

      //This action is irrelevant to us, pass it on to the next middleware
      default:
        return next(action);
    }
  }

})();

export default socketMiddleware
