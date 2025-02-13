import React from 'react';
import './Faculty.css';
import Search from '../Search/Search';

function Faculty() {
  return (
    <div className="faculty-container">
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
