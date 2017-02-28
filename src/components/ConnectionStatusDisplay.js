import React, {Component} from 'react';
import {CONNECTED, CONNECTING} from '../constants';
import RetryTimer from '../components/RetryTimer';

class ConnectionStatusDisplay extends Component {
  render()
  {
    if (this.props.connected === CONNECTED) {
      return (
        <span className="mdl-color-text--green-500" title="Connected"><i className="fa fa-circle"></i></span>
      )
    } else if (this.props.connected === CONNECTING) {
      return (
        <span className="mdl-color-text--orange-500" title="Connecting"><i className="fa fa-circle"></i></span>
      )
    } else {
      return (
        <span className="mdl-color-text--red-500" title="Not connected"><i className="fa fa-circle"></i><RetryTimer /></span>
      )
    }
  }
}

export default ConnectionStatusDisplay;
