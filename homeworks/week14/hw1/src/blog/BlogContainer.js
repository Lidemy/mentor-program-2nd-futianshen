import { connect } from 'react-redux'
import { checkLogin } from '../actionCreators'
import Blog from './Blog'

const mapStateToProps = state => ({
  username: state.username
})

const mapDispatchToProps = dispatch => ({
  checkLogin: () => dispatch(checkLogin())
})

export default connect(mapStateToProps, mapDispatchToProps)(Blog)