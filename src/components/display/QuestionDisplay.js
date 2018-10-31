import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Media from './Media';

class QuestionDisplay extends Component {
  render()
  {
    if (this.props.roundNumber === undefined || this.props.questionNumber === 0) {
      return (<span></span>);
    }

    let choices;
    let choicesElement;

    if (this.props.question.choices) {
      choices = this.props.question.choices;
      choicesElement = (
        <List>
          {choices.map((choice) => {
            let selected = false;
            let choiceDisplay;
            if (this.props.correct && choice === this.props.question.answer) {
              choiceDisplay = (<h3><strong>{choice}</strong></h3>);
              selected = true;
            } else {
              choiceDisplay = (<h4>{choice}</h4>);
              selected = false;
            }
            return (<ListItem selected={selected}>
              <ListItemText primary={choiceDisplay} />
            </ListItem>)
          })}
        </List>
      );
    } else if (this.props.correct) {
      choicesElement = (
        <h3><strong>{this.props.question.answer}</strong></h3>
      )
    }

    return (
      <div className="full-height">
        <Media media={this.props.question.media}/>
        <h3><strong>{this.props.questionNumber}.</strong> {this.props.question.question}</h3>
        {choicesElement}
      </div>
    );
  }
}

export default QuestionDisplay;
