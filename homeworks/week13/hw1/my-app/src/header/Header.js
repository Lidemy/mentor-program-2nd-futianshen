import React, { Component } from 'react'
import { Link, Route } from "react-router-dom";
import './Header.css'
import Nav from './nav'

class Header extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div id="Header">
        <div className="container">
          <Route
            path='/' 
            exact='true'
            children={() => (
              <Link id="logo" to='/' >React</Link>
            )}
          />
          <Nav onClick={this.props.onClick} />
        </div>
        
      </div>
    )
  }
}

export default Header
