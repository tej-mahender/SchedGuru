import React, { useState } from "react";
import "./Rooms.css";

const allocatedRooms = [
  { id: 1, name: "Room A", from: 101, to: 110 },
  { id: 2, name: "Room B", from: 111, to: 120 },
  { id: 3, name: "Room C", from: 121, to: 130 },
];

function Rooms() {
  const [searchRoll, setSearchRoll] = useState("");

  const handleSearch = (e) => setSearchRoll(e.target.value);

  const filteredRooms = searchRoll
    ? allocatedRooms.filter((room) => room.from <= searchRoll && room.to >= searchRoll)
    : allocatedRooms;

  return (
    <div className="rooms-container">
      <h2 className="text-center text-primary">Allocated Rooms</h2>

      <div className="room-layout">
        {/* Allocated Rooms List */}
        <div className="allocated-box">
          <h4>Allocated Rooms</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Room Name</th>
                <th>Roll No Range</th>
              </tr>
            </thead>
            <tbody>
              {allocatedRooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.name}</td>
                  <td>{room.from} - {room.to}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Search Room by Roll Number */}
        <div className="search-box">
          <h4>Find Your Room</h4>
          <input
            type="number"
            className="form-control search-bar"
            placeholder="Enter Roll Number"
            value={searchRoll}
            onChange={handleSearch}
          />
          <div className="search-results">
            {searchRoll && filteredRooms.length === 0 && (
              <p className="text-danger">No Room Found</p>
            )}
            {filteredRooms.map((room) => (
              <p key={room.id} className="room-found">
                Roll No {searchRoll} is in <strong>{room.name}</strong>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
