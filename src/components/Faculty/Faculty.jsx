import React from 'react';
import { Link } from 'react-router-dom';
import './Faculty.css';
import Search from '../Search/Search';

function Faculty() {
  return (
    <div className="faculty-container d-flex flex-column">
            <nav>
           <ul className="nav-links">
             <li className='back me-2'><Link to="/back">Back</Link></li>
             <li className='date me-2'><Link to="/date">Date</Link></li>
           </ul>
         </nav>
      <div className="faculty">
        <h1 className="faculty-title">Faculty</h1>
        <p className="faculty-subtext">Search for faculty members and view their details & schedules.</p>
        <div className="search-bar">
          <Search />
        </div>
      </div>
    </div>
  );
}
export default Faculty;
