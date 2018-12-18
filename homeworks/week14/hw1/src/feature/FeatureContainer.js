import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Feature from './Feature'

const mapStateToProps = state =>({
  featureTitle: state.featureTitle
})

export default withRouter(connect(mapStateToProps, null)(Feature)) // 需要 withRouter Feature.js 的 Route 才能運作