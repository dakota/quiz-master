import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import * as colors from '@material-ui/core/colors';
import CardHeader from '@material-ui/core/CardHeader';
import {withStyles} from '@material-ui/core/styles';

import Menu from './Menu';
import {buzzer} from '../../constants';

const styles = {
  header: {
    textAlign: 'center'
  }
};

class Contestants extends PureComponent {
  render()
  {
    const contestant = this.props.contestant;
    const stateMap = {
      READY: 100,
      BUZZED: 700,
      FROZEN: 50,
    };
    const colorMap = typeof colors[this.props.contestant.color] !== 'undefined' ? colors[this.props.contestant.color] : colors.amber;
    const buzzed = contestant.buzzer === buzzer.BUZZED;
    let color;

    if (this.props.correct === true) {
      color = colorMap['A700'];
    } else {
      color = colorMap[stateMap[contestant.buzzer]];
    }

    return (
      <Card raised={buzzed || this.props.correct} className={this.props.className} style={{backgroundColor: color}}>
        <CardHeader
          title={contestant.score}
          action={this.props.adminMode && <Menu contestant={contestant} updateValue={this.props.updateValue}/>}
          subheader={contestant.name}
          className={this.props.classes.header}
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

export default withStyles(styles)(Contestants);
