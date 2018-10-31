import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
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
      <Card raised className={colorClass + ' contestant'}>
        <CardHeader
          title={contestant.name}
          actio={this.props.adminMode && <Menu contestant={contestant} updateValue={this.props.updateValue}/>}
        />
        <CardContent>
          <h2>{contestant.score}</h2>
        </CardContent>
      </Card>
    )
  }
}

Contestants.propTypes = {
  correct: PropTypes.bool,
  adminMode: PropTypes.bool
};

Contestants.defaultProps = {
  correct: false,
  adminMode: false
};

export default Contestants;
