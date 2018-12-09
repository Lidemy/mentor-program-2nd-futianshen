import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Article.css' 

class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {
      article: {}
    }
  }
  componentDidMount() {
    const id = this.props.match.params.id
    fetch(`http://45.55.26.18:3310/posts/${id}`)
    .then(response => response.json())
    .then(json => this.setState({
      article: json
    }))
  }
  render() {
    const { article } = this.state
    return (
      <div className="Article container">
        <div className="Article__content wrapper col-12">
          <h1>{!article.title ? 'Loading...': article.title} <Link to="/blog">back</Link></h1>
          <p>{article.body}</p>
        </div>
      </div>
    )
  }
}

export default Article