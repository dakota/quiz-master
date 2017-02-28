import React, {Component} from 'react';
import {
  Card,
  CardTitle,
  CardActions,
} from 'react-mdl';
import {buzzer} from '../../constants';
import Menu from './Menu';

class Contestants extends Component {
  render()
  {
    const contestant = this.props.contestant;
    const stateMap = {
      READY: '500',
      BUZZED: '900',
      FROZEN: '200',
      disconnected: '50'
    }
    let colorClass = 'mdl-color--' + this.props.contestant.color + '-';

    if (contestant.connected === false) {
      colorClass += stateMap.disconnected;
    } else {
      colorClass += stateMap[contestant.buzzer];
    }

    return (
      <Card shadow={1} className={colorClass} style={{width: this.props.width + '%', height: '200px', margin: 'auto'}}>
        <CardTitle expand style={{alignItems: 'flex-start', color: '#fff', textAlign: 'center'}}>
          <h4>{contestant.name}</h4>
        </CardTitle>
        <CardActions border style={{
          borderColor: 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          boxSizing: 'border-box',
          alignItems: 'center',
          color: '#fff'
        }}>
          {contestant.buzzer === buzzer.BUZZED && contestant.connected && <h5>BUZZED</h5>}
          <div className="mdl-layout-spacer"></div>
          <h2>{contestant.score}</h2>
        </CardActions>
        {this.props.adminMode && <Menu contestant={contestant} updateValue={this.props.updateValue}/> }
      </Card>
    )
  }
}

export default Contestants;
