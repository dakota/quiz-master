import React, {Component} from 'react';
import Contestant from './Contestant';

class Contestants extends Component {
  render()
  {
    console.log(this.props);
    const contestants = Object.entries(this.props.contestants);
    const width = (100 / contestants.length) - 1;
    return (
      <div>
        <div style={{display: 'flex'}}>
        {contestants.map((contestant) => {
          if (!contestant[1].connected) {
            return '';
          }
          return <Contestant adminMode={this.props.adminMode} key={contestant[1]._id} contestant={contestant[1]} width={width} updateValue={(key, value) => {
            this.props.updateValue(contestant[1]._id, key, value);
          }} />
        })}
        </div>
        {this.props.buzzed && this.props.correct && <h1>Correct!</h1>}
        {this.props.buzzed === false && this.props.correct === false && <h1>Incorrect!</h1>}
      </div>
    )
  }
}

export default Contestants;
