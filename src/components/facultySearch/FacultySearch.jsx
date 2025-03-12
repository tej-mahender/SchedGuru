import React, { useState, useEffect } from "react";
import axios from "axios";

const FacultySearch = () => {
  const [faculties, setFaculties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFaculties, setFilteredFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch faculty list
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get("http://localhost:4000/faculties");
        setFaculties(response.data);
      } catch (err) {
        setError("Failed to fetch faculties.");
      }
    };
    fetchFaculties();
  }, []);

  // Fetch schedule when a faculty is selected
  const fetchSchedule = async (empID) => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await axios.get(`http://localhost:4000/schedules/emp/${empID}`);
      if (response.data.length > 0) {
        setSchedule(response.data[0].schedule);
      } else {
        setSchedule([]);
        setError("No schedule found for this faculty.");
      }
    } catch (err) {
      setError("Failed to fetch schedule.");
    } finally {
      setLoading(false);
    }
  };

  // Handle faculty selection
  const handleSelectFaculty = (faculty) => {
    setSelectedFaculty(faculty);
    setSchedule([]); // Clear previous schedule
    fetchSchedule(faculty.empID);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedFaculty(null);
    setSchedule([]);
    setError(null);
  };

  // Handle search on Enter key press
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setFilteredFaculties(
        faculties.filter((faculty) =>
          faculty.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  };

  // Define period slots
  const periods = [
    "9:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 1:00",
    "1:00 - 2:00",
    "2:00 - 3:00",
    "3:00 - 4:00",
    "4:00 - 5:00",
  ];

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Search Faculty</h2>
      <input
        type="text"
        placeholder="Enter faculty name and press enter"
        className="w-full p-2 border border-gray-300 rounded-lg"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearch} // Trigger search only on Enter key press
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {filteredFaculties.length > 0 && (
        <ul className="mt-4">
          {filteredFaculties.map((faculty) => (
            <li
              key={faculty.empID}
              className="p-2 border-b cursor-pointer hover:bg-blue-100"
              onClick={() => handleSelectFaculty(faculty)}
            >
              <p className="text-lg font-semibold">{faculty.name}</p>
              <p className="text-sm text-gray-600">{faculty.department}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for Faculty Details */}
      {modalOpen && selectedFaculty && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full shadow-lg">
            <h3 className="text-xl font-bold mb-2">{selectedFaculty.name}'s Schedule</h3>
            <p className="text-sm text-gray-600 mb-4">{selectedFaculty.department}</p>

            {loading ? (
              <p className="text-center">Loading schedule...</p>
            ) : (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">Day</th>
                    {periods.map((period, index) => (
                      <th key={index} className="border border-gray-300 p-2">
                        {period}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((daySchedule, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2 font-bold">{daySchedule.day}</td>
                      {periods.map((_, periodIndex) => {
                        const isFree = daySchedule.freePeriods.includes(periodIndex + 1);
                        return (
                          <td
                            key={periodIndex}
                            className={`border border-gray-300 p-2 text-center ${
                              isFree ? "bg-green-200" : "bg-red-200"
                            }`}
                          >
                            {isFree ? "Free" : "Busy"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultySearch;
