import React, { useEffect, useState } from "react";
import { useLogin } from "../../contexts/LoginContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Card, Button, Table, Form } from "react-bootstrap";
import "./Profile.css";

const Profile = () => {
  const { user, updatePassword, logout } = useLogin();
  const [newPassword, setNewPassword] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");

  if (!user) return <Navigate to="/login" />;

  // Fetch logged-in user's schedule
  useEffect(() => {
    axios.get(`http://localhost:4000/schedules/emp/${user.empID}`)
      .then((res) => setSchedule(res.data))
      .catch((err) => console.error("Error fetching schedule:", err));
  }, [user.empID]);

  // Fetch all faculties (for HOD role)
  useEffect(() => {
    if (user.role === "hod") {
      axios.get("http://localhost:4000/faculties")
        .then((res) => setFaculties(res.data))
        .catch((err) => console.error("Error fetching faculties:", err));
    }
  }, [user.role]);

  // Assign admin role to selected faculty
  const assignAdmin = () => {
    axios.put(`http://localhost:4000/faculties/${selectedFaculty}/role`, { role: "admin" })
      .then(() => alert("Admin assigned successfully!"))
      .catch((err) => console.error("Error assigning admin:", err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card className="profile-card p-4 w-75 shadow">
        <Card.Body>
          <h2 className="text-center mb-4">Welcome, {user.name} ({user.role})</h2>
          <p className="text-center">Employee ID: {user.empID}</p>
          <p className="text-center">Email: {user.email}</p>
          <p className="text-center">Department: {user.department}</p>
          
          {/* Schedule Table */}
          {/* <h4 className="mt-4">Your Schedule</h4>
          <Table striped bordered hover className="mt-2">
            <thead>
              <tr>
                <th>Day</th>
                <th>Free Periods</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item, index) => (
                <tr key={index}>
                  <td>{item.day}</td>
                  <td>{item.freePeriods.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </Table> */}

          {/* HOD - Assign Admin Section */}
          {user.role === "hod" && (
            <div className="mt-4">
              <h4>Assign Admin</h4>
              <Form.Select className="mb-2" onChange={(e) => setSelectedFaculty(e.target.value)}>
                <option>Select Faculty</option>
                {faculties.map((faculty) => (
                  <option key={faculty._id} value={faculty._id}>
                    {faculty.name} ({faculty.department})
                  </option>
                ))}
              </Form.Select>
              <Button variant="success" className="w-100" onClick={assignAdmin}>
                Assign as Admin
              </Button>
            </div>
          )}

          {/* Change Password */}
          <div className="mt-4">
            <h4>Change Password</h4>
            <input
              type="password"
              className="form-control mb-2"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button
              variant="primary"
              className="w-100 mb-2"
              onClick={() => updatePassword(user.empID, newPassword)}
            >
              Update Password
            </Button>
          </div>

          {/* Logout Button */}
          <Button variant="danger" className="w-100 mt-2" onClick={logout}>
            Logout
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;