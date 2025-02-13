import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Main from './components/Main/Main'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import RootLayout from './RootLayout'
import Faculty from './components/Faculty/Faculty'
import Admin from './components/Admin/Admin'
import Login from './components/Login/Login'
import Rooms from './components/Rooms/Rooms'
import Date from './components/Date/Date'
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
        path: "/faculty",
        element:<Faculty /> 
      },
      {
        path: "/rooms",
        element:<Rooms />
      },
      {
        path: "/admin",
        element:<Admin /> 
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
