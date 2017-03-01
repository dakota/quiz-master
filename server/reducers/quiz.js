import {ANSWER, DISPLAY_UPDATED} from '../actions';
import YAML from 'yamljs';

const loadQuiz = () => {
  const questions = YAML.load('./quiz.yml').map((round) => {
    round.total = round.questions.length;

    return round;
  });

  return {
    changed: false,
    current: {
      round: 1,
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
    case ANSWER: {
      if (!action.correct) {
        return state;
      }

      const currentQuestion = state.current.question;
      const currentRound = state.current.round;
      const newState = Object.assign({}, state);

      if (currentQuestion >= state.questions[currentRound].total) {
        newState.changed = true;
        newState.current.round++;
        newState.current.question = 0;

        return newState;
      }

      newState.changed = true;
      newState.current.question++;

      return newState;
    }

    default:
      return state;
  }
}

export default quiz
