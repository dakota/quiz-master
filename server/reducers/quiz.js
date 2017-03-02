import {NEXT_QUESTION, DISPLAY_UPDATED} from '../actions';
import YAML from 'yamljs';

const shuffle = (array) =>
{
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const loadQuiz = () => {
  const questions = YAML.load('./quiz.yml').map((round) => {
    round.total = round.questions.length;

    round.questions = round.questions.map((question) => {
      if (question.choices) {
        question.choices = shuffle(question.choices);
      }
      return question;
    })

    return round;
  });

  return {
    changed: false,
    end: false,
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

      if (state.end) {
        newState.end = false;
        newState.current.round = 0;
        newState.current.question = 0;
      }

      if (newState.current.round === 0 || newState.current.question > state.questions[state.current.round - 1].total) {
        newState.current.round++;
        newState.current.question = 0;
      }

      if (newState.current.round > state.totalRounds) {
        newState.end = true;
      }

      return newState;
    }

    default:
      return state;
  }
}

export default quiz
