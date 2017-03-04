import {connect} from 'react-redux'
import BuzzerButtonDisplay from './BuzzerButtonDisplay';
import {buzz} from '../../actions';

const mapStateToProps = (state) =>
{
  return {
    buzzer: state.contestant.buzzer,
    color: state.contestant.color,
    active: state.active
  }
}

let timer = 0;

const mapDispatchToProps = (dispatch, ownProps) => {
 return {
   buzz: () => {
     clearTimeout(timer);
     timer = setTimeout(() => {dispatch(buzz())}, 250);
   }
 }
}

const BuzzerButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuzzerButtonDisplay)

export default BuzzerButton
