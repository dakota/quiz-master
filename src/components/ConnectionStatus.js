import {connect} from 'react-redux'
import ConnectionStatusDisplay from '../components/ConnectionStatusDisplay'

const mapStateToProps = (state) =>
{
  return {
    connected: state.connection.connected
  }
}

const ConnectionStatus = connect(
  mapStateToProps
)(ConnectionStatusDisplay)

export default ConnectionStatus
