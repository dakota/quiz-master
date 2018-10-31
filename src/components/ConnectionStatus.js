import {connect} from 'react-redux'
import ConnectionStatusDisplay from '../components/ConnectionStatusDisplay'
import {connect as connectAction} from '../actions';

const mapStateToProps = (state) =>
{
  return {
    connected: state.connection.connected,
    retryTimer: state.connection.retryTimer,
    configured: state.configured
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(connectAction())
    }
  }
};

const ConnectionStatus = connect(
  mapStateToProps, mapDispatchToProps
)(ConnectionStatusDisplay);

export default ConnectionStatus
