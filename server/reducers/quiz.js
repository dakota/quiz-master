import {NEXT_QUESTION, DISPLAY_UPDATED} from '../actions';
import YAML from 'yamljs';

const loadQuiz = () => {
  const questions = YAML.load('./quiz.yml').map((round) => {
    round.total = round.questions.length;

    return round;
  });

  return {
    changed: false,
    current: {
      round: 0,
      question: 0
    },
    totalRounds: questions.length,
    questions
  }
}

function quiz(state = loadQuiz(), action)
{
  switch (action.type) {
    case DISPLAY_UPDATED:
      return Object.assign({}, state, {changed: false});
    case NEXT_QUESTION: {
      const newState = Object.assign({}, state);

      newState.changed = true;
      newState.current.question++;

      if (newState.current.round === 0 || newState.current.question > state.questions[state.current.round - 1].total) {
        newState.current.round++;
        newState.current.question = 0;
      }

      if (newState.current.round > state.totalRounds) {
        newState.current.round = 0;
        newState.current.question = 0;
      }

      return newState;
    }

    default:
      return state;
  }
}

export default quiz
