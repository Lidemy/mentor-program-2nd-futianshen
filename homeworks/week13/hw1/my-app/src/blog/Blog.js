import React, { Component } from 'react'
import handler from 'react-handlers'
import { withRouter } from 'react-router-dom'
import './Blog.css'
import Post from './post'

class Blog extends Component {
  constructor() {
    super()
    this.state = {
      articles: []
    }
  }
  render() {
    const { articles } = this.state
    const { history } = this.props
    return (
      <div className="Blog">
        <Post />
        <div className="post__list container">
          {articles.map(article => (
            <div 
              key={article.id}
              name="post"
              className="post__article col-4 wrapper"
              onClick={handler(
                this.props.onClick,
                () => {
                  history.push(`/blog/${article.id}`)
                })}
            >
              <h1>{article.title}</h1>
              <h3>{article.author}</h3>
              <p>{article.body}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
  componentDidMount() {
    const url = 'http://45.55.26.18:3310/posts'
    fetch(url) 
    .then(resp => resp.json()) 
    .then(json => this.setState({
      articles: json
    }))
  }
  componentDidUpdate() {// 資料庫更新就 render
    const url = 'http://45.55.26.18:3310/posts'
    fetch(url) 
    .then(resp => resp.json()) 
    .then(json => this.setState({ 
      articles: json
    }))
  }
}

export default withRouter(Blog)