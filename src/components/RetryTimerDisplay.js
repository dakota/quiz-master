import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

class RetryTimerDisplay extends Component {
  render()
  {
    if (this.props.retryTimer >= 0 && this.props.configured) {
      return (
        <span>Retrying connection in {this.props.retryTimer} seconds. <Button onClick={e => {
          e.preventDefault();
          this.props.onClick();
        }}>Retry now</Button>
        </span>
      )
    }

    return null;
  }
}

export default RetryTimerDisplay;
