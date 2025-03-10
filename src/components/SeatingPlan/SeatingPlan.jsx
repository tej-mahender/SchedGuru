// src/components/Admin.jsx
import React, { useState, useEffect } from "react";
import Classroom from '../classroom/Classroom';
import Subject from "../subject/Subject";
import "./SeatingPlan.css";

const Admin = () => {
  const [examDate, setExamDate] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassrooms, setSelectedClassrooms] = useState([]);

  // Fetch subjects from backend
  useEffect(() => {
    fetch("http://localhost:4000/subjects")
      .then((res) => res.json())
      .then((data) => setSubjects(data))
      .catch((err) => console.error("Error fetching subjects:", err));
  }, []);

  // Fetch classrooms from backend
  useEffect(() => {
    fetch("http://localhost:4000/classrooms")
      .then((res) => res.json())
      .then((data) => setClassrooms(data))
      .catch((err) => console.error("Error fetching classrooms:", err));
  }, []);

  // Toggle subject selection
  const toggleSubject = (subjectCode) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectCode)
        ? prev.filter((code) => code !== subjectCode)
        : [...prev, subjectCode]
    );
  };

  // Toggle classroom selection
  const toggleClassroom = (roomName) => {
    setSelectedClassrooms((prev) =>
      prev.includes(roomName)
        ? prev.filter((room) => room !== roomName)
        : [...prev, roomName]
    );
  };

  // Submit seating plan
  const handleSubmit = async () => {
    if (!examDate || selectedSubjects.length === 0 || selectedClassrooms.length === 0) {
      alert("Please select exam date, subjects, and classrooms.");
      return;
    }

    const seatingData = {
      examDate,
      subjects: selectedSubjects,
      classrooms: selectedClassrooms,
    };

    try {
      const response = await fetch("http://localhost:4000/seating-plan/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seatingData),
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error submitting seating plan:", error);
    }
  };

  return (
    <div className="container">
    <div className="admin-container">
      <h1>Exam Seating Plan</h1>

      <label>Select Exam Date:</label>
      <input
        type="date"
        value={examDate}
        onChange={(e) => setExamDate(e.target.value)}
      />

      <h2>Select Subjects</h2>
      <div className="sub-container">
        {subjects.map((subject) => (
          <Subject
            key={subject.subjectCode}
            subject={subject}
            isSelected={selectedSubjects.includes(subject.subjectCode)}
            toggleSubject={toggleSubject}
          />
        ))}
      </div>

      <h2>Select Classrooms</h2>
      <div className="class-container">
        {classrooms.map((room) => (
          <Classroom
            key={room.name}
            room={room}
            isSelected={selectedClassrooms.includes(room.name)}
            toggleClassroom={toggleClassroom}
          />
        ))}
      </div>

      <button className="submit-btn" onClick={handleSubmit}>Generate Seating Plan</button>
    </div>
    </div>
  );
};

export default Admin;
