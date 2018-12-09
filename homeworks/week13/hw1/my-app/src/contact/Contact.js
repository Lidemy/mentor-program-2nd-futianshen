import React, { Component } from 'react'
import './Contact.css'

class Contact extends Component {
  render() {
    return (
      <div className="Contact container">
        <div className="Contact__content wrapper">
          <label > name
            <input type="text" className="col-4"/>
          </label>
          <label> e-mail 
            <input type="email" className="col-4"/>
          </label>
          <label >
            content
            <textarea className="col-12" />
          </label>
          <button onClick={this.onSubmit}>Submit</button> 
        </div>   
      </div>
    ) 
  }
}

export default Contact