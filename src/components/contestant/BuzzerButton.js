import {connect} from 'react-redux'
import throttle from 'lodash.throttle';

import BuzzerButtonDisplay from './BuzzerButtonDisplay';
import {buzz} from '../../actions';

const mapStateToProps = (state) =>
{
  return {
    buzzer: state.contestant.buzzer,
    active: state.active
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
 return {
   buzz: throttle(() => dispatch(buzz()), 250)
 }
};

const BuzzerButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuzzerButtonDisplay);

export default BuzzerButton
