import React, {Component, PropTypes} from 'react';
import {
  Card,
  CardTitle,
  CardActions,
} from 'react-mdl';
import Menu from './Menu';
import {buzzer} from '../../constants';

class Contestants extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      flashState: false
    }
  }

  triggerBuzzerFlash()
  {
    setTimeout(() =>
    {
      this.setState({flashState: !this.state.flashState});
    }, this.state.flashState ? 1000 : 250);
  }

  componentWillMount()
  {
    if (this.props.contestant.buzzer === buzzer.BUZZED) {
      this.triggerBuzzerFlash();
    }
  }

  componentWillUpdate(props)
  {
    if (props.contestant.buzzer === buzzer.BUZZED) {
      this.triggerBuzzerFlash()
    } else if (this.state.flashState === true) {
      this.setState({flashState: false});
    }
  }

  render()
  {
    const contestant = this.props.contestant;
    const stateMap = {
      READY: 500,
      BUZZED: 100,
      FROZEN: 100,
    }
    let colorClass = 'mdl-color--' + this.props.contestant.color + '-';

    if (this.props.correct === true) {
      colorClass += '900';
    } else {
      colorClass += (this.props.contestant.buzzer === buzzer.BUZZED && !this.state.flashState ? 800 : stateMap[contestant.buzzer]);
    }

    return (
      <Card shadow={1} className={colorClass + ' contestant'}>
        <CardTitle expand style={{alignItems: 'flex-start', color: '#fff', textAlign: 'center'}}>
          <h3 style={{textAlign: 'center', width: '100%'}}>{contestant.name}</h3>
        </CardTitle>
        <CardActions border style={{
          borderColor: 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          boxSizing: 'border-box',
          alignItems: 'center',
          color: '#fff'
        }}>
          <div className="mdl-layout-spacer"></div>
          <h2>{contestant.score}</h2>
        </CardActions>
        {this.props.adminMode && <Menu contestant={contestant} updateValue={this.props.updateValue}/> }
      </Card>
    )
  }
}

Contestants.propTypes = {
  correct: PropTypes.bool
};

Contestants.defaultProps = {
  correct: false
};

export default Contestants;
