import {connect} from 'react-redux'
import NameDisplay from './NameDisplay'

const mapStateToProps = (state) =>
{
  return {
    name: state.contestant.name
  }
}

const Name = connect(
  mapStateToProps
)(NameDisplay)

export default Name
