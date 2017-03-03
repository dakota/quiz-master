import React, {Component} from 'react';
import Contestant from './Contestant';

class Contestants extends Component {
  render()
  {
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
      <div className={this.props.adminMode ? 'admin-contestants': 'contestants'}>
        <div className="correct">
          {!this.props.adminMode && !(this.props.correct <= 0) && <h1>Correct!</h1>}
          {!this.props.adminMode && this.props.correct === -1 && <h1>Incorrect!</h1>}
          {!this.props.adminMode && this.props.correct === -2 && <h1>Nobody got it right!</h1>}
          {this.props.end && winner !== '' && <h1>Congratulations to {winner}!</h1>}
        </div>
        <div className='contestant-container'>
        {contestants.map((contestant) => {
          if (!contestant[1].connected) {
            return '';
          }
          return <Contestant correct={contestant[1]._id === this.props.correct} adminMode={this.props.adminMode} key={contestant[1]._id} contestant={contestant[1]} updateValue={(key, value) => {
            this.props.updateValue(contestant[1]._id, key, value);
          }} />
        })}
        </div>
      </div>
    )
  }
}

export default Contestants;
