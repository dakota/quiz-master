import {connect} from 'react-redux'
import RetryTimerDisplay from '../components/RetryTimerDisplay'
import {connect as connectAction} from '../actions';

const mapStateToProps = (state) =>
{
  return {
    retryTimer: state.connection.retryTimer,
    configured: state.configured
  }
}

const mapDispatchToProps = (dispatch, ownProps) =>
{
  return {
    onClick: () => {
      dispatch(connectAction())
    }
  }
}

const RetryTimer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RetryTimerDisplay)

export default RetryTimer
