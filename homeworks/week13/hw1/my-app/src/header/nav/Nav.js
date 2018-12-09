import React, { Component, Fragment } from 'react'
import handler from 'react-handlers'
import { Route, Link } from 'react-router-dom'
import './Nav.css'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trigger: 0
    }
  }
  handleToggleMenu = () => {
    const { trigger } = this.state
    this.setState({
      trigger: !trigger
    })
  }
  handleCloseMenu = () => {
    this.setState({
      trigger: 0
    })
  }

  render() {
    const { trigger } = this.state
    return (
     <Fragment>
      <nav className={trigger ? 'nav--active' : 'nav'}>
        <ul className={trigger ? 'nav__list--active' : 'nav__list'} >
          <Route exact='true' children={() => (
            <li><Link name="blog" to='blog' 
              onClick={handler(this.handleCloseMenu, this.props.onClick)} 
            >blog</Link></li>
          )}/>
          <Route exact='true' children={() => (
            <li><Link name="contact" to='contact' 
              onClick={handler(this.handleCloseMenu, this.props.onClick)}
            >Contact</Link></li>
          )}
          />
        </ul>
      </nav>
      <div className="nav__trigger" onClick={this.handleToggleMenu}>menu</div>
     </Fragment>
    )
  }
}

export default Nav
