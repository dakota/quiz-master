import {connect} from 'react-redux'
import ContestantsDisplay from './ContestantsDisplay'
import {updateContestantField} from '../../actions';

const mapStateToProps = (state) =>
{
  return {
    contestants: state.contestants.contestants,
    buzzed: state.contestants.buzzed,
    correct: state.contestants.correct
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateValue: (_id, key, value) => {
      dispatch(updateContestantField(_id, key, value));
    }
  }
}

const Contestants = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContestantsDisplay)

export default Contestants
