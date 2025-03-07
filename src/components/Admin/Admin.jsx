import React, { useState } from "react";
import "./Admin.css";

const roomsData = [
  { id: 1, name: "Room A", capacity: 10 },
  { id: 2, name: "Room B", capacity: 15 },
  { id: 3, name: "Room C", capacity: 20 },
];

function Admin() {
  const [availableRooms, setAvailableRooms] = useState(roomsData);
  const [allocatedRooms, setAllocatedRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [fromRoll, setFromRoll] = useState("");
  const [toRoll, setToRoll] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setFromRoll("");
    setToRoll("");
    setErrorMessage("");
  };

  const handleFromChange = (e) => setFromRoll(e.target.value);
  const handleToChange = (e) => setToRoll(e.target.value);

  const handleSubmit = () => {
    if (!selectedRoom) return;

    const from = parseInt(fromRoll);
    const to = parseInt(toRoll);

    if (isNaN(from) || isNaN(to) || from > to) {
      setErrorMessage("⚠️ Invalid Roll Number Range!");
      return;
    }

    const totalStudents = to - from + 1;
    if (totalStudents > selectedRoom.capacity) {
      setErrorMessage(`⚠️ Limit Exceeded! Max ${selectedRoom.capacity} students.`);
      return;
    }

    setAllocatedRooms([...allocatedRooms, { ...selectedRoom, from, to }]);
    setAvailableRooms(availableRooms.filter((room) => room.id !== selectedRoom.id));
    setSelectedRoom(null);
    setErrorMessage("");
  };

  const handleDelete = (room) => {
    setAllocatedRooms(allocatedRooms.filter((r) => r.id !== room.id));
    setAvailableRooms([...availableRooms, room]); // Move back to available rooms
  };

  return (
    <div className="rooms-container">
      {/* White Box for Available & Allocated Rooms */}
      <div className="rooms-wrapper">
        <div className="rooms-box">
          <h3 className="text-success">Available Rooms</h3>
          {availableRooms.length === 0 ? (
            <p className="text-danger">No Rooms Available</p>
          ) : (
            availableRooms.map((room) => (
              <button key={room.id} className="room-btn" onClick={() => handleRoomClick(room)}>
                {room.name} (Capacity: {room.capacity})
              </button>
            ))
          )}
        </div>

        <div className="rooms-box">
          <h3 className="text-warning">Allocated Rooms</h3>
          {allocatedRooms.length === 0 ? (
            <p className="text-muted">No Allocations Yet</p>
          ) : (
            allocatedRooms.map((room) => (
              <div key={room.id} className="allocated-room">
                <strong>{room.name}</strong> - Roll Numbers: {room.from} to {room.to}
                <button className="delete-btn btn btn-danger btn-sm" onClick={() => handleDelete(room)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Room Allocation Form */}
      {selectedRoom && (
        <div className="room-details">
          <h3 className="text-primary">Allocating: {selectedRoom.name}</h3>
          <label className="form-label">Enter Roll Number Range:</label>
          <div className="roll-inputs">
            <input type="number" className="form-control" value={fromRoll} onChange={handleFromChange} placeholder="From" />
            <input type="number" className="form-control" value={toRoll} onChange={handleToChange} placeholder="To" />
          </div>
          {errorMessage && <p className="error-msg">{errorMessage}</p>}
        </div>
      )}

      {/* Submit Button */}
      <button className="submit-btn btn btn-primary" onClick={handleSubmit}>
        Submit Allocation
      </button>
    </div>
  );
}

export default Admin;
