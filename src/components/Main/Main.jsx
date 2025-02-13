import React from 'react'
import './Main.css'
import { Link } from 'react-router-dom'
function Main() {
  return (
      <div className="main">
       <nav>
      <ul className="nav-links">
        <li className='faculty me-2'><Link to="/faculty">Faculty</Link></li>
        <li className='rooms me-2'><Link to="/rooms">Rooms</Link></li>
        <li className='admin me-2'><Link to="/admin">Admin</Link></li>
        <li className='login me-2'><Link to="/login">Login</Link></li>
      </ul>
    </nav>
      <h1 className="schedguru">SchedGuru</h1>
      <blockquote className="blockquote text-end">
        <p>"Plan your schedule like a pro."</p>
      </blockquote>
    </div>
  )
}

export default Main