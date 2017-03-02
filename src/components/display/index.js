import React, {Component} from 'react';
import {connect} from 'react-redux';
import {configure} from '../../actions';
import {CLASS_DISPLAY} from '../../constants';
import Contestants from './Contestants';
import Question from './Question';

class Display extends Component {
  componentWillMount()
  {
    this.props.dispatch(configure(CLASS_DISPLAY));
  }

  render()
  {
    return (
      <div>
        <header>
          <h2>
            Quiz Master 3000 - Round {this.props.roundNumber}
            {this.props.questionNumber !== 0 && <small>Question {this.props.questionNumber}</small>}
          </h2>
        </header>
        <Question />
        <Contestants />
      </div>
    )
  }
}

Display = connect(
  (state) => {
    return {
      roundNumber: state.question.roundNumber,
      roundName: state.question.roundName,
      questionNumber: state.question.questionNumber,
    }
  }
)(Display);

export default Display;
