import React, { useState } from "react";
import axios from "axios";
import "./Date.css";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const periods = [1, 2, 3, 4, 5, 6];

function Date() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedPeriods, setSelectedPeriods] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [error, setError] = useState(null);

  const togglePeriod = (period) => {
    setSelectedPeriods((prev) =>
      prev.includes(period) ? prev.filter((p) => p !== period) : [...prev, period]
    );
  };

  const fetchFreeFaculties = async () => {
    if (!selectedDay || selectedPeriods.length === 0) {
      alert("Please select a day and at least one period.");
      return;
    }

    try {
      setError(null);
      setFacultyList([]);

      const response = await axios.get(`http://localhost:4000/schedules/free`, {
        params: { day: selectedDay, period: selectedPeriods.join(",") },
      });

      setFacultyList(response.data);
    } catch (error) {
      console.error("Error fetching free faculties:", error);
      setError(error.response?.data?.message || "No free faculties found.");
    }
  };

  return (
    <div className="date-selector-container">
      <h2 className="date-selector-title">Select Day & Periods</h2>

      {/* Day Selection */}
      <div className="date-selector-days">
        {days.map((day, index) => (
          <button
            key={index}
            className={`date-selector-day-btn ${selectedDay === day ? "active" : ""}`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Period Selection */}
      <div className="date-selector-periods">
        {periods.map((period) => (
          <button
            key={period}
            className={`date-selector-period-btn ${selectedPeriods.includes(period) ? "active" : ""}`}
            onClick={() => togglePeriod(period)}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Fetch Free Faculties Button */}
      <button onClick={fetchFreeFaculties} className="date-selector-fetch-btn">
        Get Free Faculties
      </button>

      {/* Display Error Message */}
      {error && <p className="date-selector-error">{error}</p>}

      {/* Display Faculty List */}
      {facultyList.length > 0 && (
        <div className="date-selector-faculty-list">
          <h3 className="date-selector-faculty-title">Available Faculties:</h3>
          <ul>
            {facultyList.map((faculty, index) => (
              <li key={index} className="date-selector-faculty-item">
                <p className="date-selector-faculty-name">{faculty.name}</p>
                <p className="date-selector-faculty-details">{faculty.department}</p>
                <p className="date-selector-faculty-details">{faculty.email}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Date;
