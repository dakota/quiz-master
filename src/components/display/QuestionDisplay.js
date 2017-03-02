import React, {Component} from 'react';
import {List, ListItem} from 'react-mdl';

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
            if (this.props.correct && choice === this.props.question.answer) {
              choice = (<h3><strong>{choice}</strong></h3>);
            } else {
              choice = (<h4>{choice}</h4>)
            }
            return (<ListItem style={{display: 'inline-block'}}>
              {choice}
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
      <div>
        <h3><strong>{this.props.question.question}</strong></h3>
        {choicesElement}
      </div>
    );
  }
}

export default QuestionDisplay;
