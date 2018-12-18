import React, { Component } from 'react'
import './Post.css'

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      article: [],
      title: '',
      body: ''
    }
  }
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = () => {
    const { title, body } = this.state
    const { author } = this.props
    const { onPostListUpdate } = this.props // 怎麼發文就更新清單 ？
    if(title==='' || body==='') {
      alert('請輸入內容')
      return
    }
    this.props.createPost(title, body, author)
    this.setState({
      title: '',
      body: '',
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
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    )
  }
}

export default Post