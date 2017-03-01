import {actions} from '../constants';

const question = (state = {}, action) =>
{
  switch (action.type) {
    case actions.QUESTION:
      return {
        roundNumber: action.roundNumber,
        roundName: action.roundName,
        questionNumber: action.questionNumber,
        question: action.question
      };
    default:
      return state
  }
}

export default question
