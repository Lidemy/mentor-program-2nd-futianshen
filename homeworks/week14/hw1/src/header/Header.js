import React from 'react'
import { Link, Route } from "react-router-dom";
import './Header.css'
import Nav from './nav'

export default function Header() {
  return (
    <div id="Header">
      <div className="container">
        <Route path='/' exact='true' children={() => (
            <Link id="logo" to='/' >React</Link>
        )}/>
        <Nav />
      </div>
    </div>
  )
}
