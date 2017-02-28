import React, {Component} from 'react';
import {connect} from 'react-redux';
import {configure} from '../../actions';
import {CLASS_DISPLAY} from '../../constants';
import Contestants from './Contestants';

class Display extends Component {
  componentWillMount()
  {
    this.props.dispatch(configure(CLASS_DISPLAY));
  }

  render()
  {
    return (
      <div>
        <h3>Quiz Master 3000</h3>
        <Contestants />
      </div>
    )
  }
}

Display = connect()(Display);

export default Display;
