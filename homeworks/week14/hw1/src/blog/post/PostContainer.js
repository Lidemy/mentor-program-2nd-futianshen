import { connect } from 'react-redux'
import { createPost } from '../../actionCreators'
import Post from './Post'

const mapStateToProps = state => ({
  author: state.username
})

const mapDispatchToProps = dispatch => ({
  createPost: (title, body, author) =>  dispatch(createPost(title, body, author))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)