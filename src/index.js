import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Home from './Home'
import Game from './Game'
import Login from './Login'
import Guild from './components/Guild'
import Inventory from './components/Inventory'
import Quest from './components/Quest'
import Task from './components/Task'
import Market from './components/Market'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
        path: "task",
        element: <Task></Task>,
        index: true
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
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
