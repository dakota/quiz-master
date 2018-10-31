import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import classnames from 'classnames';
import * as colors from '@material-ui/core/colors';
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
    };
    const colorMap = typeof colors[this.props.contestant.color] !== 'undefined' ? colors[this.props.contestant.color] : colors.amber;
    let color;

    if (this.props.correct === true) {
      color = colorMap[900];
    } else {
      color = colorMap[(this.props.contestant.buzzer === buzzer.BUZZED && !this.state.flashState ? 800 : stateMap[contestant.buzzer])];
    }

    return (
      <Card raised className={this.props.className} style={{backgroundColor: color}}>
        <CardHeader
          title={contestant.score}
          action={this.props.adminMode && <Menu contestant={contestant} updateValue={this.props.updateValue}/>}
          subheader={contestant.name}
        />
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
