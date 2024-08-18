import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './SideBar.css'
import logo from '../../assets/logo.png'


const SideBar = () => {
  return (
    <div className='sidebar'>
      <img src={logo} className='logo'/>
        <ul className='sidebar-links'>
            <li>
                <Link to='/home' className='nav-text'>
                Home</Link>
                <Link to='/my-decks' className='nav-text'>
                My Decks</Link>
                <Link to='/new' className='nav-text'>
                Create New</Link>
                <Link to='/sign-up' className='nav-text'>
                Sign Up</Link>
                <Link to='/login' className='nav-text'>
                Login</Link>
            </li>
        </ul>
      
    </div>
  )
}

export default SideBar
