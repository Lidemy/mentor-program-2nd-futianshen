import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import './Blog.css'
import Post from './post'

const ArticleS = props => {
  const { articles } = props
  const { history } = props
  return (
    <Fragment>
      {articles.map(article => (
        <div 
          key={article.id}
          name="post"
          className="post__article col-4 wrapper"
          onClick={() => {
              history.push(`/blog/${article.id}`)
          }}
        >
          <h1>{article.title}</h1>
          <h3>{article.author}</h3>
          <p>{article.body}</p>
        </div>
      ))}
    </Fragment>
  )
}

class Blog extends Component {
  constructor() {
    super()
    this.state = {
      articles: []
    }
  }
  handlePostListUpdate = () => {
    const url = 'http://45.55.26.18:3310/posts'
    fetch(url)
    .then(resp => resp.json())
    .then(json => this.setState({
      articles: json
    }))
  }
  render() {
    const { articles } = this.state
    const { history, username } = this.props
    console.log(!username)
    return (
      <div className="Blog">
        {username && <Post onPostListUpdate={this.handlePostListUpdate} />}
        <div className="post__list container">
          <ArticleS articles={articles} history={history} />
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.props.checkLogin()
    const url = 'http://45.55.26.18:3310/posts'
    fetch(url)
    .then(resp => resp.json())
    .then(json => this.setState({
      articles: json
    }))
  }
}

export default withRouter(Blog) // 不使用 withRouter 會怎麼樣？刪掉試試看