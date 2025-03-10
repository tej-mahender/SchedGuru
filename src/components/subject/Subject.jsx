import React from "react";
import "./Subject.css";

const Subject = ({ subject, isSelected, toggleSubject }) => {
  return (
    <div
      className={`subject-box ${isSelected ? "selected" : ""}`}
      onClick={() => toggleSubject(subject.subjectCode)}
    >
      {subject.name} <br />
      <small>Code: {subject.subjectCode}</small>
    </div>
  );
};

export default Subject;
