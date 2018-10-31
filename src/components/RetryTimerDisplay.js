import React, {Component} from 'react';

class RetryTimerDisplay extends Component {
  render()
  {
    if (this.props.retryTimer >= 0 && this.props.configured) {
      return (
        <span>Retrying connection in {this.props.retryTimer} seconds. <a onClick={e => {
          e.preventDefault();
          this.props.onClick();
        }}>Retry now</a>
        </span>
      )
    } else {
      return (<span></span>)
    }
  }
}

export default RetryTimerDisplay;
