import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './SideBar.css'


const SideBar = () => {
  return (
    <div className='sidebar'>
        <ul className='sidebar-links'>
            <li>
                <Link to='/home' className='nav-text'>
                Home</Link>
                <Link to='/my-decks' className='nav-text'>
                My Decks</Link>
                <Link to='/new' className='nav-text'>
                Create New</Link>
            </li>
        </ul>
      
    </div>
  )
}

export default SideBar
