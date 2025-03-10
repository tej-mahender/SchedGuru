import React, { useState, useEffect } from "react";
import "./SeatingSchedule.css";

const SeatingSchedule = () => {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchRollNumber, setSearchRollNumber] = useState("");
  const [highlightedSeat, setHighlightedSeat] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/seating-plan/schedule")
      .then((res) => res.json())
      .then((data) => {
        if (data.schedule) {
          setSchedule(data.schedule);
        } else {
          setError("No seating schedule available.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching schedule.");
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    if (!schedule || !searchRollNumber.trim()) return;

    let foundSeat = null;
    for (const room of schedule.seats) {
      const student = room.students.find((s) => s.rollNumber === searchRollNumber);
      if (student) {
        foundSeat = { ...student, classroom: room.classroom };
        break;
      }
    }
    setHighlightedSeat(foundSeat);
  };

  if (loading) return <p className="text-center mt-4">Loading seating schedule...</p>;
  if (error) return <p className="text-center text-danger mt-4">{error}</p>;

  return (
    <div className="seating-container">
      {/* Header Section */}
      <div className="header-section text-center">
        <h1 className="text-primary fw-bold">Exam Seating Plan</h1>
        <h4 className="text-secondary">Subject: {schedule.subjects}</h4>
        <h5 className="text-muted">Date: {schedule.examDate}</h5>
      </div>

      {/* Seating Details Section */}
      <div className="seating-details">
        <table className="table table-bordered table-hover">
          <thead className="table-primary text-center">
            <tr>
              <th>Classroom</th>
              <th>No. of Students</th>
              <th>Roll Number Range</th>
            </tr>
          </thead>
          <tbody>
            {schedule.seats.map((room) => {
              const rollNumbers = room.students.map((s) => s.rollNumber);
              const rollRange = rollNumbers.length
                ? `${rollNumbers[0]} - ${rollNumbers[rollNumbers.length - 1]}`
                : "N/A";

              return (
                <tr key={room.classroom}>
                  <td className="text-center fw-bold">{room.classroom}</td>
                  <td className="text-center">{room.students.length}</td>
                  <td className="text-center">{rollRange}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Roll Number"
          value={searchRollNumber}
          onChange={(e) => setSearchRollNumber(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>

      {/* Search Result & Highlighted Seat */}
      {highlightedSeat && (
        <div className="result-section">
          <div className="student-card">
            <h4 className="text-success fw-bold">Student Found!</h4>
            <p><strong>Roll Number:</strong> {highlightedSeat.rollNumber}</p>
            <p><strong>Classroom:</strong> {highlightedSeat.classroom}</p>
            <p><strong>Seat Number:</strong> {highlightedSeat.seatNumber}</p>
          </div>

          {/* Seat Layout */}
          <div className="seat-layout">
            <h5 className="text-warning fw-bold">Classroom: {highlightedSeat.classroom}</h5>
            <div className="seat-container">
              {schedule.seats
                .find((room) => room.classroom === highlightedSeat.classroom)
                .students.map((student) => (
                  <div
                    key={student.rollNumber}
                    className={`seat ${student.rollNumber === highlightedSeat.rollNumber ? "highlighted-seat" : ""}`}
                  >
                    {student.seatNumber}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatingSchedule;
