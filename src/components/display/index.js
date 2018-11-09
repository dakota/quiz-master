import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

import {configure} from '../../actions';
import {CLASS_DISPLAY} from '../../constants';
import Contestants from './Contestants';
import Question from './Question';
import ConnectionStatus from '../ConnectionStatus';

const styles = {
  wrapper: {
    position: 'relative',
  },
  connectionWrapper: {
    position: 'absolute',
    top: 0,
    right: 0
  }
};

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontSize: 5,
    htmlFontSize: 10,
  },
  spacing: {
    unit: 5
  }
});

class Display extends PureComponent {
  componentWillMount()
  {
    this.props.dispatch(configure(CLASS_DISPLAY));
  }

  render()
  {
    const {classes} = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.wrapper}>
          <div className={classes.connectionWrapper}>
            <ConnectionStatus/>
          </div>
          <Question />
          <Contestants />
        </div>
      </MuiThemeProvider>
    )
  }
}

Display = connect()(Display);

export default withStyles(styles)(Display);
