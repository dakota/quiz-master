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

import Media from './Media';

const styles = {
  card: {
    maxWidth: '60%',
    margin: '10px auto'
  },
};

class QuestionDisplay extends Component {
  renderChoices()
  {
    const {question, correct} = this.props;

    if (!question.choices) {
      return;
    }

    return (
      <CardContent>
        <List>
          {question.choices.map((choice) => {
            return (<ListItem selected={correct && choice === question.answer}>
              <ListItemIcon>
                {correct && choice === question.answer && <CheckBoxChecked />}
                {(!correct || choice !== question.answer) && <CheckBoxEmpty/>}
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
    const {classes, correct, roundNumber, roundName, questionNumber, question} = this.props;
    let cardContent;

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
        <Media media={question.media}/>
        {correct && !question.choices && <CardContent>
          <Typography variant="h5">The correct answer was: <strong>{this.props.question.answer}</strong></Typography>
        </CardContent>}
        {this.renderChoices()}
      </>;
    }

    return (
      <Card raised className={classes.card}>
        {cardContent}
      </Card>
    );
  }
}

export default withStyles(styles)(QuestionDisplay);
