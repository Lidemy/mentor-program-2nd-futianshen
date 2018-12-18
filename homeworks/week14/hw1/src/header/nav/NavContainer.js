import { connect } from 'react-redux'
import { changeFeatureTitle, logout } from '../../actionCreators'
import Nav from './Nav'

const mapStateToProps = state => ({
  isLogin : state.isLogin
})


const mapDispatchToProps = dispatch => ({
  changeFeatureTitle: e => dispatch(changeFeatureTitle(e)),
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps ,mapDispatchToProps)(Nav)