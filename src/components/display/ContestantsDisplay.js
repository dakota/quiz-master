import React, {Component} from 'react';
import Contestant from './Contestant';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
  displayWrapper: {
    height: 'auto',
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  adminWrapper: {

  },
  contestants: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  contestant: {
    marginRight: 20
  }
};

class Contestants extends Component {
  render()
  {
    const {classes} = this.props;

    const contestants = Object.entries(this.props.contestants);
    let winner = '';

    if (this.props.end) {
      let topScore = 0;
      for (let contestant of contestants) {
        if (contestant[1].score > topScore) {
          topScore = contestant[1].score;
          winner = contestant[1].name;
        } else if (contestant[1].score !== 0 && contestant[1].score === topScore) {
          winner += ' and ' + contestant[1].name;
        }
      }
    }

    return (
      <div className={this.props.adminMode ? classes.adminWrapper: classes.displayWrapper}>
        <div className="correct">
          {!this.props.adminMode && !(this.props.correct <= 0) && <Typography variant="h1">Correct!</Typography>}
          {!this.props.adminMode && this.props.correct === -1 && <Typography variant="h1">Incorrect!</Typography>}
          {!this.props.adminMode && this.props.correct === -2 && <Typography variant="h1">Nobody got it right!</Typography>}
          {this.props.end && winner !== '' && <Typography variant="h1">Congratulations to {winner}!</Typography>}
        </div>
        <div className={classes.contestants}>
        {contestants.map((contestant) => {
          if (!contestant[1].connected) {
            return '';
          }
          return <Contestant
            correct={contestant[1]._id === this.props.correct}
            adminMode={this.props.adminMode}
            key={contestant[1]._id}
            contestant={contestant[1]}
            updateValue={(key, value) => {
              this.props.updateValue(contestant[1]._id, key, value);
            }}
            className={classes.contestant}
          />
        })}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Contestants);
