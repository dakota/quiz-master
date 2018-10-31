import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CLASS_CONTESTANT} from '../../constants';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {configure} from '../../actions';

class Configuration extends Component {
  state = {
    name: ''
  }

  start() {
    this.props.dispatch(configure(CLASS_CONTESTANT, this.state.name));
  }

  render()
  {
    return (
      <div>
        <h4>Welcome to Quiz Master 3000</h4>

        <div>
          <p>What is your name?</p>
          <TextField
            label="My name is"
            value={this.state.name}
            onChange={(event) => this.setState({name: event.target.value})}
          />
          <div>
            <Button variant="contained" color="primary" onClick={() => this.start()}>Start playing</Button>
          </div>
        </div>
      </div>
    )
  }
}

Configuration = connect()(Configuration);

export default Configuration;
