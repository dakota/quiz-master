import React, {Component} from 'react';
import {CONNECTED, CONNECTING} from '../constants';
import RetryTimer from '../components/RetryTimer';

class ConnectionStatusDisplay extends Component {
  render()
  {
    if (this.props.connected === CONNECTED) {
      return (
        <span className="mdl-color-text--green-500" title="Connected">o</span>
      )
    } else if (this.props.connected === CONNECTING) {
      return (
        <span className="mdl-color-text--orange-500" title="Connecting">o</span>
      )
    } else {
      return (
        <span className="mdl-color-text--red-500" title="Not connected"><RetryTimer /></span>
      )
    }
  }
}

export default ConnectionStatusDisplay;
