import React, {Component} from 'react';
import {CONNECTED, CONNECTING} from '../constants';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import ConnectingIcon from '@material-ui/icons/SignalWifi0Bar';
import ConnectedIcon from '@material-ui/icons/SignalWifi4Bar';
import ReconnectIcon from '@material-ui/icons/SignalWifiOff';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

class ConnectionStatusDisplay extends Component {
  render()
  {
    if (this.props.connected === CONNECTED) {
      return (
        <IconButton><ConnectedIcon style={{color: green[500]}} /></IconButton>
      )
    } else if (this.props.connected === CONNECTING) {
      return (
        <IconButton><ConnectingIcon style={{color: orange[500]}} /></IconButton>
      )
    } else if (this.props.retryTimer >= 0 && this.props.configured) {
      return (
        <IconButton color="inherit" onClick={this.props.onClick}>
          <Badge badgeContent={this.props.retryTimer} style={{color: red[500]}}>
            <ReconnectIcon/>
          </Badge>
        </IconButton>
      )
    }

    return null;
  }
}

export default ConnectionStatusDisplay;
