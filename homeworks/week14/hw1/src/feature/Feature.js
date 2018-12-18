import React from 'react'
import { Route, Link } from 'react-router-dom'
import './Feature.css'

class Feature extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    const { featureTitle } = this.props
    return (
      <section className="feature">
        <div className="container">
          <h1 className="feature__title">{featureTitle}</h1>
          <Route path="/blog/:id" render={Breadcrumbs} />
        </div>
      </section>
    )
  }
}

function Breadcrumbs() {
  return(
    <div className="breadcrumbs">
      <ul>
        <li><Link to="/blog">blog</Link></li>
        <li>article</li>
      </ul>
    </div>
  )
}

export default Feature