import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import './Article.css' 

class Edit extends Component {
  constructor (props) {
    super(props)
  }
  render() {
    const { value, onChange,  onClick } = this.props
    return (
      <Fragment>
        <textarea value={value} onChange={onChange} /> 
        <button onClick={onClick}>submit</button>
      </Fragment>
    )
  } 
}
class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {
      article: {},
      postState: 'post',
      value: 'ffff'
    }
  }
  componentDidMount() {
    const id = this.props.match.params.id // match 的資料是從 Route 的 path 來的
    this.props.readPost(id)
  }
  handleDelete = () => {
    const { article } = this.props
    if(window.confirm('確定要刪除嗎')) {
      this.props.deletePost(article.id)
      window.history.back()
    }

  }
  handleEdit = () => {
    const { article } = this.props
    let value = article.body
    this.setState({
      value,
      postState: 'edit'
    })
  }
  handleEditSubmit = () => {
    const { value } = this.state
    const { article, username } = this.props
    if(value==='') {
      alert('請輸入內容')
      return
    }
    this.props.editPost(article.id, article.title, value, username)
    this.setState({
      value,
      postState: 'post'
    })
  }
  handelEditChange = e => {
    this.setState({
      value : e.target.value
    })
  }
  render() {
    const { article } = this.props
    const { postState } = this.state
    const { value } = this.state
    const { username } = this.props
    return (
      <div className="Article container">
        <div className="Article__content wrapper col-12">
          <h1>{!article.title ? 'Loading...': article.title} 
            <Link to="/blog">back</Link>
            {username && 
              <Fragment>
                <button onClick={this.handleDelete}>Delete</button>
                <button onClick={this.handleEdit}>Edit</button>
              </Fragment>
            }
          </h1>
          {postState==='edit' ? <Edit value={value} onChange={this.handelEditChange} onClick={this.handleEditSubmit} /> : <p>{article.body}</p>}
        </div>
      </div>
    )
  }
}

export default Article