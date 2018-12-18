import { connect } from 'react-redux'
import { login } from '../actionCreators'
import Login from './Login'

const mapStateToProps = state => ({
  errorMessage: state.loginErrorMessage,
})

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(login(username, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)