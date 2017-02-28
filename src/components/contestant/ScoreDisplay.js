import React, {Component} from 'react';

class ScoreDisplay extends Component {
  render()
  {
    return (
      <h4>{this.props.score}</h4>
    )
  }
}

export default ScoreDisplay;
