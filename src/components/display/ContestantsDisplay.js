import React, {Component} from 'react';
import Contestant from './Contestant';
import {withStyles} from '@material-ui/core/styles';

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
          {!this.props.adminMode && !(this.props.correct <= 0) && <h1>Correct!</h1>}
          {!this.props.adminMode && this.props.correct === -1 && <h1>Incorrect!</h1>}
          {!this.props.adminMode && this.props.correct === -2 && <h1>Nobody got it right!</h1>}
          {this.props.end && winner !== '' && <h1>Congratulations to {winner}!</h1>}
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
