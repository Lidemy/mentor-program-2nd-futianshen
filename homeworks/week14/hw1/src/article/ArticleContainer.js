import { connect } from 'react-redux'
import { deletePost, editPost, readPost } from '../actionCreators'
import Article from './Article'

const mapStateToProps = state => ({
  article: state.article,
  username: state.username
})

const mapDispatchToProps = dispatch => ({
  readPost: id => dispatch(readPost(id)),
  deletePost: id => dispatch(deletePost(id)),
  editPost: (id, title, body, author) => dispatch(editPost(id, title, body, author))
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)