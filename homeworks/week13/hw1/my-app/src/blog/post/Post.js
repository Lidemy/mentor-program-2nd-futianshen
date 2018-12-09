import React, { Component } from 'react'
import './Post.css'

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      author: 'test3'
    }
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = () => {
    const { title, body, author } = this.state
    if(title==='' || body==='') {
      alert('請輸入內容')
      return
    }
    const url =  `http://45.55.26.18:3310/posts`
    const params = new URLSearchParams({
      title,
      body,
      author
    })
    fetch(url, {
      method: 'POST',
      body: params
    })
    .then(() => {
      alert('Success')
      this.setState({
        title: '',
        body: ''
      })
    }).catch(() => {
      alert('Error')
    })
    
  }

  render() {
    const { title, body } = this.state
    return (
      <div className="Post">
        <div className="container">
          <label>title
            <input
              className="col-12"
              name="title" 
              type="text" 
              value={title} 
              onChange={this.handleInputChange} 
            />
          </label>
          <label className="col-12" >content
            <textarea
              className="col-12"
              name="body" 
              value={body} 
              onChange={this.handleInputChange} 
            />
          </label> 
          <button onClick={this.onSubmit}>Submit</button>
        </div>
      </div>
    )
  }
}

export default Post