import React, {Component} from 'react';
import {List, ListItem} from 'react-mdl';
import Media from './Media';

class QuestionDisplay extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      showQuestion: false
    };
    this.finishedPlaying = this.finishedPlaying.bind(this);
  }

  componentWillReceiveProps(props)
  {
    this.setState({
      showQuestion: !(props.question && props.question.media)
    });
  }

  finishedPlaying()
  {
    this.setState({
      showQuestion: true
    });
  }

  render()
  {
    if (this.props.roundNumber === undefined || this.props.questionNumber === 0) {
      return (<span></span>);
    }

    let choices;
    let choicesElement;

    if (this.state.showQuestion && this.props.question.choices) {
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
      <div className="full-height">
        <div style={{height: this.state.showQuestion ? '250px' : 'calc(100% - 300px)'}}>
          <Media media={this.props.question.media} onFinish={this.finishedPlaying}/>
        </div>
        {this.state.showQuestion && <h3><strong>{this.props.questionNumber}.</strong> {this.props.question.question}</h3>}
        {choicesElement}
      </div>
    );
  }
}

export default QuestionDisplay;
