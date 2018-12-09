import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'

import Header from './header'
import Feature from './feature'
import Blog from './blog'
import Contact from './contact'
import Article from './article'
import Footer from './footer'

class App extends Component {
  constructor() {
    super()
    this.state = {
      featureTitle: 'blog'
    }
  }
  toggleBreadcrumbs = () => {
    console.log('breadcrumbs')
  }
  changeFeatureTitle = (e) => {
    this.setState({
      featureTitle: e.target.name
    })
  }
  render() {
    const { featureTitle } = this.state
    return (
     <Router>
       <div className="App">
        <Header onClick={this.changeFeatureTitle}/>
        <Feature featureTitle={featureTitle} />
        <Route exact path="/" component={Blog} /> 
        <Route exact path="/blog" render={() => <Blog onClick={this.toggleBreadcrumbs}  />} />
        <Route path="/blog/:id" component={Article} />
        <Route path="/contact" component={Contact} />
        <Footer />
      </div>
     </Router> 
    )
  }
}

export default App
