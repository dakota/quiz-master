import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CheckBoxEmpty from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxChecked from '@material-ui/icons/CheckBox';
import {withStyles} from '@material-ui/core/styles';
import classnames from 'classnames';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

import Media from './Media';

const styles = {
  card: {
    maxWidth: '60%',
    margin: '10px auto'
  },
  resultDisplay: {
    textAlign: 'center',
    padding: 0
  },
  correct: {
    backgroundColor: green[100]
  },
  incorrect: {
    backgroundColor: red[100]
  }
};

class QuestionDisplay extends Component {
  renderChoices()
  {
    const {question, displayAnswer} = this.props;

    if (!question.choices) {
      return;
    }

    return (
      <CardContent>
        <List>
          {question.choices.map((choice) => {
            return (<ListItem selected={displayAnswer && choice === question.answer}>
              <ListItemIcon>
                {displayAnswer && choice === question.answer && <CheckBoxChecked />}
                {(!displayAnswer || choice !== question.answer) && <CheckBoxEmpty/>}
              </ListItemIcon>
              <ListItemText primary={<Typography variant="h5">{choice}</Typography>} />
            </ListItem>)
          })}
        </List>
      </CardContent>
    );
  }

  render()
  {
    const {classes, correct, roundNumber, roundName, questionNumber, question, displayAnswer} = this.props;
    let cardContent;
    let extraClass;

    if (roundNumber === undefined || roundNumber === 0) {
      cardContent = (
        <CardHeader
          title="Waiting for the quiz to start"
          subheader="Please join the game"
        />
      );
    } else if (questionNumber === 0) {
      cardContent = (
        <CardHeader
          title={`Round ${roundNumber} - ${roundName}`}
          subheader={`Round ${roundNumber} is about to start`}
        />
      );
    } else {
      cardContent = <>
        <CardHeader
          title={question.question}
          subheader={`Round ${roundNumber} - ${roundName} (Question ${questionNumber})`}
        />
        <CardContent className={classes.resultDisplay}>
          {correct === -2 && <Typography variant="subtitle1">Nobody got that one!</Typography>}
        </CardContent>
        <Media media={question.media}/>
        {displayAnswer && !question.choices && <CardContent>
          <Typography variant="h5">The correct answer was: <strong>{this.props.question.answer}</strong></Typography>
        </CardContent>}
        {this.renderChoices()}
      </>;

      if (!(correct <= 0)) {
        extraClass = classes.correct;
      } else if (correct !== 0) {
        extraClass = classes.incorrect;
      }
    }

    return (
      <Card raised className={classnames(classes.card, extraClass)}>
        {cardContent}
      </Card>
    );
  }
}

export default withStyles(styles)(QuestionDisplay);
