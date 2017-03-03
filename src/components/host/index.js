import React, { Component } from 'react';
import {connect} from 'react-redux';
import {configure, clearBuzzers, correctAnswer, incorrectAnswer, nextQuestion} from '../../actions';
import { CLASS_HOST } from '../../constants';
import Contestants from '../display/Contestants';
import {Button} from 'react-mdl';
import Question from './Question';

class Host extends Component {
  componentWillMount() {
    this.props.dispatch(configure(CLASS_HOST));
  }

  render() {
    let buttons;

    if (this.props.roundNumber === 0) {
      buttons = (
        <div style={{marginTop: '30px'}}>
          <Button raised ripple onClick={() =>
          {
            this.props.dispatch(nextQuestion());
          }}>Start the quiz</Button>
        </div>
      );
    } else if (!this.props.end) {
      buttons = (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{marginTop: '30px'}}>
            <Button disabled={!this.props.buzzed} colored raised ripple onClick={() =>
            {
              this.props.dispatch(correctAnswer());
            }}>Correct!</Button>
            <Button disabled={!this.props.buzzed} accent raised ripple onClick={() =>
            {
              this.props.dispatch(incorrectAnswer());
            }}>Incorrect</Button>
          </div>
          <div style={{marginTop: '30px'}}>
            <Button raised ripple disabled={this.props.contestantCount > 0 && this.props.questionNumber !== 0 && (this.props.correct === 0 || this.props.correct === -1)} onClick={() =>
            {
              this.props.dispatch(nextQuestion());
            }}>{this.props.questionNumber === 0 ? 'Start round' : 'Next question'}</Button>
          </div>
        </div>
        <div style={{position: 'absolute', bottom: '10px'}}>
          <Button raised ripple onClick={() =>
          {
            this.props.dispatch(clearBuzzers());
          }}>Clear buzzer</Button>
        </div>
      </div>
      );
    } else {
      buttons = (<div style={{marginTop: '30px'}}>
        <Button raised ripple onClick={() =>
        {
          this.props.dispatch(nextQuestion());
        }}>Restart the quiz</Button>
      </div>)
    }

    return (
      <div>
        <h3>Quiz Master 3000 Host</h3>
        <Question />
        <Contestants adminMode />
        {buttons}
      </div>
    );
  }
}

Host = connect((store) => {
  return {
    end: store.question.end,
    buzzed: store.contestants.buzzed,
    correct: store.contestants.correct,
    roundNumber: store.question.roundNumber,
    questionNumber: store.question.questionNumber,
    contestantCount: Object.entries(store.contestants.contestants).length
  }
})(Host);

export default Host;
