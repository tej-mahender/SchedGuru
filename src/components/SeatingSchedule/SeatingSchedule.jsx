import React, { useState, useEffect } from "react";
import "./SeatingSchedule.css"; // Add styles for better UI

const SeatingSchedule = () => {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the latest seating schedule
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
      .catch((err) => {
        setError("Error fetching schedule.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading seating schedule...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="seating-container">
      <h1>Exam Seating Plan</h1>
      <h1>Exam Subject: {schedule.subjects}</h1>
      <h2>Exam Date: {schedule.examDate}</h2>

      <table>
        <thead>
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
                <td>{room.classroom}</td>
                <td>{room.students.length}</td>
                <td>{rollRange}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SeatingSchedule;
