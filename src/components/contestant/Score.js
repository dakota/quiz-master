import {connect} from 'react-redux'
import ScoreDisplay from './ScoreDisplay'

const mapStateToProps = (state) =>
{
  return {
    score: state.contestant.score
  }
}

const Score = connect(
  mapStateToProps
)(ScoreDisplay)

export default Score
