import {connect} from 'react-redux'
import BuzzerButtonDisplay from './BuzzerButtonDisplay';
import {buzz} from '../../actions';

const mapStateToProps = (state) =>
{
  return {
    buzzer: state.contestant.buzzer,
    color: state.contestant.color
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
 return {
   buzz: () => {
     dispatch(buzz());
   }
 }
}

const BuzzerButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuzzerButtonDisplay)

export default BuzzerButton
