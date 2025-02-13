import React, { useState, useEffect } from "react";

const FacultySearch = () => {
  const [faculties, setFaculties] = useState([]); // Stores all faculties
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [filteredFaculties, setFilteredFaculties] = useState([]); // Filtered list

  // Fetch faculty data (Replace with your API)
  useEffect(() => {
    fetch("http://localhost:4000/faculties") // Adjust API endpoint
      .then((response) => response.json())
      .then((data) => {
        setFaculties(data);
        setFilteredFaculties(data); // Initialize filtered list
      })
      .catch((error) => console.error("Error fetching faculties:", error));
  }, []);

  // Filter faculties when searchQuery changes
  useEffect(() => {
    const results = faculties.filter((faculty) =>
      faculty.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFaculties(results);
  }, [searchQuery, faculties]);

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Search Faculty</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Enter faculty name..."
        className="w-full p-2 border border-gray-300 rounded-lg"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Display Results */}
      <ul className="mt-4">
        {filteredFaculties.length > 0 ? (
          filteredFaculties.map((faculty) => (
            <li key={faculty.email} className="p-2 border-b">
              <p className="text-lg font-semibold">{faculty.name}</p>
              <p className="text-sm text-gray-600">{faculty.department}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-500 mt-2">No faculty found.</p>
        )}
      </ul>
    </div>
  );
};

export default FacultySearch;
