import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {withStyles} from '@material-ui/core/styles';

import {clearBuzzers, configure, correctAnswer, incorrectAnswer, nextQuestion} from '../../actions';
import {CLASS_HOST} from '../../constants';
import Contestants from '../display/Contestants';
import Question from './Question';

const styles = {
  wrapper: {
    marginTop: 80
  },
  grow: {
    flexGrow: 1
  }
};

class Host extends Component {
  componentWillMount()
  {
    this.props.setClass(CLASS_HOST);
  }

  render()
  {
    const {classes, roundNumber, onCorrect, end, onIncorrect, onClear, onNext, questionNumber, question, contestantCount, buzzed, correct} = this.props;

    return (
      <div>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>Quiz Master 3000 Host</Typography>
            {roundNumber === 0 && <Button
              color="inherit"
              disabled={contestantCount === 0}
              onClick={onNext}>Start the quiz</Button>}
            {roundNumber !== 0 && !this.props.end && <Button color="inherit" onClick={onClear}>Clear buzzer</Button>}
          </Toolbar>
        </AppBar>
        <div className={classes.wrapper}>
          {roundNumber !== 0 && <Question
            onCorrect={onCorrect}
            onIncorrect={onIncorrect}
            onNext={onNext}
            roundNumber={roundNumber}
            questionNumber={questionNumber}
            question={question}
            disabled={contestantCount === 0}
            buzzed={buzzed}
            correct={correct}
          />}
          {roundNumber !== 0 && end && <Button variant="contained" onClick={onNext}>Restart the quiz</Button>}
          <Contestants adminMode/>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setClass: (connectionClass) => dispatch(configure(connectionClass)),
  onCorrect: () => dispatch(correctAnswer()),
  onIncorrect: () => dispatch(incorrectAnswer()),
  onNext: () => dispatch(nextQuestion()),
  onClear: () => dispatch(clearBuzzers())
});

Host = connect((store) => {
  return {
    end: store.question.end,
    buzzed: store.contestants.buzzed,
    correct: store.contestants.correct,
    roundNumber: store.question.roundNumber,
    questionNumber: store.question.questionNumber,
    contestantCount: Object.entries(store.contestants.contestants).length,
    question: store.question.question,
  }
}, mapDispatchToProps)(Host);

export default withStyles(styles)(Host);
