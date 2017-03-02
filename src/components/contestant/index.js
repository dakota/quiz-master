import React, {Component} from 'react';
import {connect} from 'react-redux';
import {persistStore} from 'redux-persist'
import Name from './Name';
import Score from './Score';
import BuzzerButton from './BuzzerButton';
import Configuration from './Configuration';
import {configure} from '../../actions';
import store from '../../store';

class Contestant extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      rehydrated: false
    }
  }

  componentWillMount()
  {
    persistStore(store, {whitelist: ['id', 'class', 'contestant']}, () =>
    {
      this.setState({rehydrated: true});
      if (this.props.name) {
        this.props.dispatch(configure(this.props.class));
      }
    });
  }

  render()
  {
    if (!this.state.rehydrated) {
      return (
        <div>Loading...</div>
      )
    }

    if (this.props.configured) {
      return (
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Name /><Score />
          </div>
          <BuzzerButton />
        </div>
      )
    }

    return (
      <div>
        <Configuration />
      </div>
    );
  }
}

Contestant = connect((store) =>
{
  return {
    configured: store.configured,
    class: store.class,
    name: store.contestant.name
  };
})(Contestant);

export default Contestant;
