import React, { useState } from "react";
import axios from "axios";
import "./Date.css";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const periods = [1, 2, 3, 4, 5, 6]; // Periods as selectable boxes

function DateSelector() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedPeriods, setSelectedPeriods] = useState([]); // Allow multiple selections
  const [facultyList, setFacultyList] = useState([]);
  const [error, setError] = useState(null);

  // Toggle period selection
  const togglePeriod = (period) => {
    setSelectedPeriods((prevSelected) =>
      prevSelected.includes(period)
        ? prevSelected.filter((p) => p !== period) // Remove if already selected
        : [...prevSelected, period] // Add if not selected
    );
  };

  // Fetch free faculties
  const fetchFreeFaculties = async () => {
    if (!selectedDay || selectedPeriods.length === 0) {
      alert("Please select a day and at least one period.");
      return;
    }

    try {
      setError(null);
      setFacultyList([]);

      const response = await axios.get(`http://localhost:4000/schedules/free`, {
        params: { day: selectedDay, period: selectedPeriods.join(",") }, // Send periods as comma-separated
      });

      setFacultyList(response.data);
    } catch (error) {
      console.error("Error fetching free faculties:", error);
      setError(error.response?.data?.message || "No free faculties found.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Select Day & Periods</h2>

      {/* Day Selection */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {days.map((day, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg border ${
              selectedDay === day ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Period Selection (Multi-Select) */}
      <div className="flex justify-center gap-2 mb-4">
        {periods.map((period) => (
          <button
            key={period}
            className={`w-12 h-12 flex items-center justify-center rounded-lg border ${
              selectedPeriods.includes(period) ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => togglePeriod(period)}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Fetch Free Faculties Button */}
      <button
        onClick={fetchFreeFaculties}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Get Free Faculties
      </button>

      {/* Display Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Display Faculty List */}
      {facultyList.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Available Faculties:</h3>
          <ul className="text-left">
            {facultyList.map((faculty, index) => (
              <li key={index} className="p-2 border-b">
                <p className="font-semibold">{faculty.name}</p>
                <p className="text-sm text-gray-600">{faculty.department}</p>
                <p className="text-sm text-gray-500">{faculty.email}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DateSelector;
