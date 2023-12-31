import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';

import Home from './Home'
import Game from './Game'
import Login from './Login'
import Signup from './Signup';

import Guild from './components/Guild'
import Inventory from './components/Inventory'
import Quest from './components/Quest'
import Task from './components/Task'
import Market from './components/Market'

import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>
  },
  {
    path: "/game",
    element: <Game></Game>,
    children: [
      {
        path: "",
        element: <Task></Task>,
        index: true
      },
      {
        path: "guild",
        element: <Guild></Guild>
      },
      {
        path: "inventory",
        element: <Inventory></Inventory>
      },
      {
        path: "quest",
        element: <Quest></Quest>
      },
      {
        path: "market",
        element: <Market></Market>
      }
    ]
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/signup",
    element: <Signup></Signup>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='dark:bg-slate-800'>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </div>
);

reportWebVitals();
