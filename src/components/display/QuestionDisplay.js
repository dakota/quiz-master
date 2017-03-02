import React, {Component} from 'react';
import {List, ListItem} from 'react-mdl';

class QuestionDisplay extends Component {
  shuffle(array)
  {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  render()
  {
    if (this.props.roundNumber === undefined || this.props.questionNumber === 0) {
      return (<span></span>);
    }

    let answers;
    let answersElement;

    if (this.props.question.answers) {
      answers = this.shuffle(this.props.question.answers);
      answersElement = (
        <List>
          {answers.map((answer) => {
            return (<ListItem style={{display: 'inline-block'}}><h4>{answer}</h4></ListItem>)
          })}
        </List>
      );
    }

    return (
      <div>
        <h3><strong>{this.props.question.question}</strong></h3>
        {answersElement}
      </div>
    );
  }
}

export default QuestionDisplay;
