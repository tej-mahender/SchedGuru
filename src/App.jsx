import './App.css'
import Main from './components/Main/Main'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { LoginProvider, useLogin } from "./contexts/LoginContext";

import RootLayout from './RootLayout'
import Faculty from './components/Faculty/Faculty'
import Admin from './components/Admin/Admin'
import SeatingSchedule from './components/SeatingSchedule/SeatingSchedule';
import Login from './components/Login/Login'
import Date from './components/Date/Date'
import SeatinPlan from './components/SeatingPlan/SeatingPlan'
import Profile from './components/Profile/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProtectedRoute = ({ children }) => {
  const { user } = useLogin();
  return user ? children : <Navigate to="/login" />;
};
  function App() {
    return (

        <Routes>
        <Route path="" element={<RootLayout />}>
        <Route index element={<Main />} />
          <Route path="login" element={<Login />} />
            <Route path="faculty" element={<Faculty />} />
            <Route path="rooms" element={<SeatingSchedule />} />
            <Route path="admin" element={<ProtectedRoute><SeatinPlan /></ProtectedRoute>} />
            <Route path="date" element={<Date />} />
            <Route path="back" element={<Main />} />
            <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Route>
        </Routes>

    )
  }
export default App
