import React, {Component} from 'react';

class ScoreDisplay extends Component {
  render()
  {
    return (
      <h3><strong>{this.props.score}</strong></h3>
    )
  }
}

export default ScoreDisplay;
