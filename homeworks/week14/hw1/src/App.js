import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import './App.css'

import Header from './header'
import Feature from './feature'
import Login from './login'
import Blog from './blog'
import Contact from './contact'
import Article from './article'
import Footer from './footer'

class App extends Component {
  render() {
    return (
     <Router>
       <div className="App">
        <Header />
        <Feature />
        <Route exact path="/" component={Login} />
        <Route exact path="/blog" component={Blog} /> 
        <Route path="/blog/:id" component={Article} /> 
        <Route path="/contact" component={Contact} />
        <Footer />
      </div>
     </Router> 
    )
  }
}

export default App

