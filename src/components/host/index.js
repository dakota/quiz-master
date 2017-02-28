import React, { Component } from 'react';
import {connect} from 'react-redux';
import {configure, clearBuzzers, correctAnswer, incorrectAnswer} from '../../actions';
import { CLASS_HOST } from '../../constants';
import Contestants from '../display/Contestants';
import {Button} from 'react-mdl';

class Host extends Component {
  componentWillMount() {
    this.props.dispatch(configure(CLASS_HOST));
  }

  render() {
    return (
      <div>
        <h3>Quiz Master 3000 Host</h3>
        <Contestants adminMode />
        <div style={{marginTop: '30px'}}>
          <Button disabled={!this.props.buzzed} colored raised ripple onClick={() => {
            this.props.dispatch(correctAnswer());
          }}>Correct!</Button>
          <Button disabled={!this.props.buzzed} accent raised ripple onClick={() =>
          {
            this.props.dispatch(incorrectAnswer());
          }}>Incorrect</Button>
        </div>
        <div style={{marginTop: '30px'}}>
          <Button raised ripple onClick={() =>
          {
            this.props.dispatch(clearBuzzers());
          }}>Clear buzzer</Button>
        </div>
        <div style={{marginTop: '30px'}}>
          <Button raised ripple onClick={this.nextQuestion}>Next question</Button>
        </div>
      </div>
    );
  }
}

Host = connect((store) => {
  return {
    buzzed: store.contestants.buzzed
  }
})(Host);

export default Host;
