import React, {Component} from 'react';

class NameDisplay extends Component {
  render()
  {
    return (
      <h3>{this.props.name}</h3>
    )
  }
}

export default NameDisplay;
