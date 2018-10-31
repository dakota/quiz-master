import React, {Component} from 'react';
import {connect} from 'react-redux';
import {persistStore} from 'redux-persist'
import Name from './Name';
import Score from './Score';
import BuzzerButton from './BuzzerButton';
import Configuration from './Configuration';
import {configure} from '../../actions';
import store from '../../store';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';

class Contestant extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      rehydrated: false
    };

    this.theme = createMuiTheme({
      palette: {
        primary: typeof colors[props.color] !== 'undefined' ? colors[props.color] : colors.amber,
      },
    });
  }

  componentWillMount()
  {
    persistStore(store, {}, () =>
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

    if (!this.props.configured) {
      return (<Configuration/>);
    }

    return (
      <MuiThemeProvider theme={this.theme}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Name/><Score/>
        </div>
        <BuzzerButton/>
      </MuiThemeProvider>
    );
  }
}

Contestant = connect((store) => ({
    configured: store.configured,
    class: store.class,
    name: store.contestant.name,
    color: store.contestant.color
}))(Contestant);

export default Contestant;
