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
  header: {
    display: 'flex'
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
      <div className="full-height">
        <header className={classes.header}>
          <Typography variant="h2" className={classes.grow}>
            Quiz Master 3000
          </Typography>
          <ConnectionStatus/>
        </header>
        <Question />
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
