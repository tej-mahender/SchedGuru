import React from 'react';
import { Link } from 'react-router-dom';
import './Faculty.css';
import FacultySearch from '../facultySearch/FacultySearch';

function Faculty() {
  return (
    <div className="faculty-container d-flex justify-content-center align-items-center">
      <div className="date-button-container">
        <Link to="/date" className="date-button">Date</Link>
      </div>

      <div className="faculty-div">
        <h1 className="faculty-title">Faculty</h1>
        <p className="faculty-subtext">Search for faculty members and view their details & schedules.</p>
        <div className="search-bar">
          <FacultySearch />
        </div>
      </div>
    </div>
  );
}

export default Faculty;
