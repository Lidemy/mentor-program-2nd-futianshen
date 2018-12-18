import { connect } from 'react-redux'
import App from './App'

const mapStateToProps = state => ({
  featureTitle: state.featureTitle
})

export default connect(mapStateToProps, null)(App)