import React, { Component, Fragment  } from 'react'
import { withRouter } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username :"",
      password :""
    }
  }
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleLogin = () => {
    const { username, password } = this.state
    const { login, history } = this.props
    login(username, password)
    // 需要區分成功和失敗
    history.push('/blog')
    this.setState({
      username : "",
      password : ""
    })
  }
  render() {
    const { username, password } = this.state
    const { errorMessage } = this.props
    return(
      <Fragment>
        <h4>{errorMessage}</h4>
        <label >Username<input name="username" value={username} onChange={this.handleInput} /></label>
        <label >Password<input name="password" value={password} onChange={this.handleInput}/></label>
        <input type="submit" onClick={this.handleLogin} />
      </Fragment>
    )
  }
}

export default withRouter(Login)