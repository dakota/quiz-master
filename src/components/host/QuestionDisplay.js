import React, {Component} from 'react';
import Media from './Media';

class QuestionDisplay extends Component {
  render()
  {
    let question;
    if (this.props.roundNumber === undefined) {
      return (<span></span>);
    }

    if (this.props.questionNumber !== 0) {
      question = (
        <div>
          <p><strong>{this.props.question.question}</strong></p>
          <p>{this.props.question.answer}</p>
          <Media media={this.props.question.media}/>
        </div>
      );
    }

    return (
      <div>
        <h4>Round {this.props.roundNumber} {this.props.questionNumber !== 0 && <small>Question {this.props.questionNumber}</small>}</h4>
        {question}
      </div>
    )
  }
}

export default QuestionDisplay;
