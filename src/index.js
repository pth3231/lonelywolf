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
import ChartLayer from './components/ChartLayer'
import Error from './Error';

import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    errorElement: <Error></Error>
  },
  {
    path: "/game",
    element: <Game></Game>,
    children: [
      {
        path: "",
        element: <Task></Task>,
        index: true,
        errorElement: <Error></Error>
      },
      {
        path: "guild",
        element: <Guild></Guild>,
        errorElement: <Error></Error>
      },
      {
        path: "inventory",
        element: <Inventory></Inventory>,
        errorElement: <Error></Error>
      },
      {
        path: "quest",
        element: <Quest></Quest>,
        errorElement: <Error></Error>
      },
      {
        path: "market",
        element: <Market></Market>,
        errorElement: <Error></Error>
      },
      {
        path: "chart",
        element: <ChartLayer></ChartLayer>,
        errorElement: <Error></Error>
      }
    ],
    errorElement: <Error></Error>
  },
  {
    path: "/login",
    element: <Login></Login>,
    errorElement: <Error></Error>
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
    errorElement: <Error></Error>
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
