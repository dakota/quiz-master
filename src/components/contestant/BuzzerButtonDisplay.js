import React, {Component} from 'react';
import {buzzer} from '../../constants';
import Button from '@material-ui/core/Button';
import AlarmIcon from '@material-ui/icons/Alarm'

class BuzzerButtonDisplay extends Component {
  render()
  {
    let display;

    switch (this.props.buzzer) {
      case buzzer.BUZZED:
        display = (<h4 className="text-success">You got the buzz</h4>);
        break;
      case buzzer.FROZEN:
        display = (<h4 className="text-error">Frozen out</h4>);
        break;
      default:
        if (this.props.active === false) {
          display = (<h4 className="text-success">Waiting to start</h4>);
        } else {
          display = '';
        }
    }

    return (
      <div>
        <Button variant="fab"
                color="primary"
                onClick={this.props.buzz}
                disabled={this.props.buzzer !== buzzer.READY || this.props.active === false}
                size="large"
        >
          <AlarmIcon />
        </Button>
        {display}
      </div>
    )
  }
}

export default BuzzerButtonDisplay;
