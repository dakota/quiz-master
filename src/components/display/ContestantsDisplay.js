import React, {Component} from 'react';
import Contestant from './Contestant';

class Contestants extends Component {
  render()
  {
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
      </div>
    )
  }
}

export default Contestants;
