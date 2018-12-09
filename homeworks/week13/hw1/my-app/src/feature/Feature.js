import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import './Feature.css'

function Breadcrumbs() {
  return(
    <div className="breadcrumbs">
      <ul>
        <li><Link to="/">blog</Link></li>
        <li>article</li>
      </ul>
    </div>
  )
}

class Feature extends Component {
  constructor(props){
    super(props)
  }
  render() {
    const { featureTitle } = this.props
    return (
      <section className="feature">
        <div className="container">
          <h1 className="feature__title">{featureTitle}</h1>
          <Route exact path="/blog/:id" component={Breadcrumbs} /> 
        </div>
      </section>
    )
  }
}

export default Feature