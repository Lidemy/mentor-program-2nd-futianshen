import React from 'react'
import { hot } from 'react-hot-loader'
import axios from 'axios'


class Post extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      post: []
    }
  }
  
  componentDidMount () {
    const {id} = this.props
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => {
      this.setState({
        post: res.data
      })
    })
  }
  render () {
    const { post } = this.state
    return (
      <div>
        <div className="card text-white bg-secondary mb-3">
          <div className="card-header">{post.title}</div>
          <div className="card-body">
            <h5 className="card-title">id:{post.id} userID:{post.userId}</h5>
            <p className="card-text">{post.body}</p>
          </div>
        </div>
      </div>
    )
  }
}
class Blog extends React.Component {
  constructor (props) { 
    super(props)
    this.state = { 
      /* 下面要設定的初始值一定要在這裡先設定，不能等setState 在新增沒有預設的初始值，會出錯  */
      postList: true,
      postS: [],
      id: null
    } // 預設顯示 API 傳回來的清單 
    /* 只有 this state 的狀態被改變才會 rerender ？在 this.state 外面的狀態不會 ？ */
    
  }
  componentDidMount () {
    axios.get(`https://jsonplaceholder.typicode.com/posts/`).then(res => {
      this.setState({
        postS: res.data
      })
    })
  }
  postClick = (e) => {
    this.setState({
      postList: !this.state.postList,
      id: e.target.id
    })
  }
  render () { 
    console.log("rerender")
    const { postS } = this.state
    return (
      <div>
        <h1>Blogs {!this.state.postList && <button type="button" className="btn btn-primary" onClick={this.postClick}>Back</button>}</h1>
        {!this.state.postList && <Post id={this.state.id} />}
        {this.state.postList && <ul className="list-group">
        {postS.map(post => { 
          return ( 
            <li className="list-group-item list-group-item-dark" key={post.id} id={post.id} onClick={this.postClick}>{post.userId}:{post.title}</li>
          )
        })} 
        </ul>}
      </div>
    )
  }
}

class Albums extends React.Component {
  render () {
    return <h1>Albums</h1> 
  }
}

const Contact = () => {
  return <h1>Contact</h1>
}

class App extends React.Component { 
  constructor (props) { 
    super(props) 
    this.state = {
      page: 'blog'
    }
  } 
  navClick = (e) => { // 不是自己定義的標籤 屬性要用 e.target 取值 不能用 this.props
    this.setState({
      page: e.target.name
    })
  } 
  render () {
    const { page } = this.state 
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <a className="navbar-brand" name="blog" onClick={this.navClick} href="#">React</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className={`nav-item ${page === 'blog' && 'active'}`} >
                <a className="nav-link" name="blog" onClick={this.navClick}>Blog</a>
              </li>
              <li className={`nav-item ${page === 'albums' && 'active'}`}> 
                <a className="nav-link" name="albums" onClick={this.navClick}>Albums</a>
              </li>
              <li className={`nav-item ${page === 'contact' && 'active'}`}>
                <a className="nav-link" name="contact" onClick={this.navClick}>Contact</a>
              </li>
            </ul>
          </div>
        </nav>
        <div style={{
           marginTop: '20px'
        }} /> {/* 要是空標簽 */} 

        <div className="container">
          { page === 'blog' && <Blog />} {/* JSX 不能使用 if else ？ */}
          { page === 'contact' && <Contact />}
          { page === 'albums' && <Albums />}
        </div>  
      </div>    
    )
  }
} 
export default hot(module)(App)