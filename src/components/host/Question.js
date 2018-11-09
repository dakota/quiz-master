import React, {Component} from 'react';
import Media from './Media';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button/Button';

const styles = {
  card: {
    maxWidth: 600,
    margin: '10px auto'
  },
  nextButton: {
    marginLeft: 'auto'
  }
};

class Question extends Component {
  render()
  {
    const {classes, roundNumber, questionNumber, question, onCorrect, onIncorrect, onNext, buzzed, disabled, correct, timer} = this.props;

    if (roundNumber === undefined) {
      return null;
    }

    const header = <>Round {roundNumber} {questionNumber !== 0 && <small>Question {questionNumber}</small>}</>;

    return (
      <Card className={classes.card}>
        <CardHeader title={header} />
        {questionNumber !== 0 && <>
          <Media media={question.media}/>
          <CardContent>
            <Typography><strong>{question.question}</strong></Typography>
            <Typography>{question.answer}</Typography>
          </CardContent>
        </>
        }
        {roundNumber !== 0 &&
        <CardActions>
          <Button
            disabled={!buzzed || disabled}
            variant="contained"
            color="primary"
            onClick={onCorrect}
            style={{marginRight: 20}}
          >
            Correct!
          </Button>
          <Button
            disabled={!buzzed || disabled}
            variant="contained" color="secondary"
            onClick={onIncorrect}
          >
            Incorrect
          </Button>
          <Button variant="contained"
                  disabled={!disabled && questionNumber !== 0 && (correct === 0 || correct === -1)}
                  onClick={onNext}
                  className={classes.nextButton}
          >
            {questionNumber === 0 ? 'Start round' : 'Next question'}
            {timer ? ` - ${timer}` : ''}
          </Button>
        </CardActions>}
      </Card>
    )
  }
}

export default withStyles(styles)(Question);
