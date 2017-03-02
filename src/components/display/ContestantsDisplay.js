import React, {Component} from 'react';
import Contestant from './Contestant';

class Contestants extends Component {
  render()
  {
    const contestants = Object.entries(this.props.contestants);
    const width = (100 / contestants.length) - 1;
    return (
      <div className={this.props.adminMode ? 'admin-contestants': 'contestants'}>
        {!this.props.adminMode && this.props.correct !== 0 && this.props.correct !== -1 && <h1>Correct!</h1>}
        {!this.props.adminMode && this.props.correct === -1 && <h1>Incorrect!</h1>}
        <div style={{display: 'flex'}}>
        {contestants.map((contestant) => {
          if (!contestant[1].connected) {
            return '';
          }
          return <Contestant correct={contestant[1]._id === this.props.correct} adminMode={this.props.adminMode} key={contestant[1]._id} contestant={contestant[1]} width={width} updateValue={(key, value) => {
            this.props.updateValue(contestant[1]._id, key, value);
          }} />
        })}
        </div>
      </div>
    )
  }
}

export default Contestants;
