import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CLASS_CONTESTANT} from '../../constants';
import {Button, Textfield} from 'react-mdl';
import {configure} from '../../actions';

class Configuration extends Component {
  start() {
    const name = this.refs.name.inputRef.value;

    this.props.dispatch(configure(CLASS_CONTESTANT, name));
  }

  render()
  {
    return (
      <div>
        <h4>Welcome to Quiz Master 3000</h4>

        <div>
          <p>What is your name?</p>
          <Textfield
            label="My name is"
            ref="name"
            floatingLabel
          />
          <div>
            <Button raised ripple onClick={() => this.start()}>Start playing</Button>
          </div>
        </div>
      </div>
    )
  }
}

Configuration = connect()(Configuration);

export default Configuration;
