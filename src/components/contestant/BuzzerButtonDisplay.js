import React, {Component} from 'react';
import {buzzer} from '../../constants';
import {FABButton, Icon} from 'react-mdl';

class BuzzerButtonDisplay extends Component {
  render()
  {
    let display;
    const colorClass = 'mdl-color--' + this.props.color + '-500';

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
        <FABButton colored className={colorClass} ripple onClick={this.props.buzz} disabled={this.props.buzzer !== buzzer.READY || this.props.active === false}>
          <Icon name="touch_app"/>
        </FABButton>
        {display}
      </div>
    )
  }
}

export default BuzzerButtonDisplay;
