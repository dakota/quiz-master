import React, {Component} from 'react';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import {configure} from '../../actions';
import {CLASS_DISPLAY} from '../../constants';
import Contestants from './Contestants';
import Question from './Question';
import ConnectionStatus from '../ConnectionStatus';

const styles = {
  grow: {
    flexGrow: 1
  },
  flexer: {
    display: 'flex',
    alignItems: 'flex-start'
  }
};

class Display extends Component {
  componentWillMount()
  {
    this.props.dispatch(configure(CLASS_DISPLAY));
  }

  render()
  {
    const {classes} = this.props;

    return (
      <div>
        <div className={classes.flexer}>
          <Question />
          <ConnectionStatus/>
        </div>
        <Contestants />
      </div>
    )
  }
}

Display = connect(
  (state) => {
    return {
      end: state.question.end,
      roundNumber: state.question.roundNumber,
      roundName: state.question.roundName,
      questionNumber: state.question.questionNumber,
    }
  }
)(Display);

export default withStyles(styles)(Display);
