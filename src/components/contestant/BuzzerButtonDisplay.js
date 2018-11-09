import React, {PureComponent} from 'react';
import {buzzer} from '../../constants';
import Button from '@material-ui/core/Button';
import AlarmIcon from '@material-ui/icons/Alarm'
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: '30px 0'
  },
  button: {
    width: '80vw',
    height: '80vw',
    maxWidth: '200px',
    maxHeight: '200px',
    fontSize: '2rem'
  }
};

class BuzzerButtonDisplay extends PureComponent {
  render()
  {
    const {classes} = this.props;

    let display;

    switch (this.props.buzzer) {
      case buzzer.BUZZED:
        display = (<Typography variant='h4' color="secondary">You got the buzz</Typography>);
        break;
      case buzzer.FROZEN:
        display = (<Typography variant='h4' color="error">Frozen out</Typography>);
        break;
      default:
        if (this.props.active === false) {
          display = (<Typography variant='h4'>Waiting to start</Typography>);
        } else {
          display = '';
        }
    }

    return (
      <div className={classes.wrapper}>
        <Button variant="fab"
                color="primary"
                onClick={this.props.buzz}
                disabled={this.props.buzzer !== buzzer.READY || this.props.active === false || this.props.timer !== 0}
                className={classes.button}
        >
          {this.props.timer === 0 && <AlarmIcon fontSize="large"/>}
          {this.props.timer > 0 && <h1>{this.props.timer}</h1>}
        </Button>
        {display}
      </div>
    )
  }
}

export default withStyles(styles)(BuzzerButtonDisplay);
