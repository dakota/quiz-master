import {connect} from 'react-redux';
import QuestionDisplay from './QuestionDisplay';

const mapStateToProps = (state) =>
{
  return {
    roundNumber: state.question.roundNumber,
    roundName: state.question.roundName,
    questionNumber: state.question.questionNumber,
    question: state.question.question,
  }
}

const Question = connect(
  mapStateToProps,
)(QuestionDisplay)

export default Question
