import { useState } from 'react'
import './App.css'
import Main from './components/Main/Main'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import RootLayout from './RootLayout'
import Faculty from './components/Faculty/Faculty'
import Admin from './components/Admin/Admin'
import SeatingSchedule from './components/SeatingSchedule/SeatingSchedule';
import Login from './components/login/Login'
import Register from './components/Register/Register';
import Date from './components/Date/Date'
import SeatinPlan from './components/SeatingPlan/SeatingPlan'
import 'bootstrap/dist/css/bootstrap.min.css';
const browserRouter = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    // errorElement: <RoutingError />,
    children: [
      {
        path: "",
        element:<Main/> 
      },
      {
        path: "/login",
        element:<Login/>
      },
      {
        path: "/register",
        element:<Register/>
      },
      {
        path: "/faculty",
        element:<Faculty /> 
      },
      {
        path: "/rooms",
        // element:<Rooms />
        element:<SeatingSchedule/>
      },
      {
        path: "/admin",
        // element:<Admin /> 
        element:<SeatinPlan/>

      },
      {
        path: "/back",
        element:<Main/> 
      },
      {
        path: "/date",
        element:<Date/> 
      },
    ],
  },
]);
  function App() {
    return <RouterProvider router={browserRouter} />;
  }
export default App
