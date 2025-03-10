import React from "react";
import "./Classroom.css";

const Classroom = ({ room, isSelected, toggleClassroom }) => {
  return (
    <div
      className={`classroom-box ${isSelected ? "selected" : ""}`}
      onClick={() => toggleClassroom(room.name)}
    >
      {room.name} <br />
      <small>Max: {room.maxCapacity}</small>
    </div>
  );
};

export default Classroom;
