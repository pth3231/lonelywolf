/*  
    Home.js
    Author: Phan Thai Hoa
    Team: lonelywolf
    Date: 7/11/2023
    Latest update: 14/11/2023

    Description:
    This have 4 parts: navbar, header, main content and footer
*/

import { Link } from "react-router-dom";
import wolf_img from "./img/wolf.png"
import arrow_down from "./img/arrow-down.png"
import running_1 from './img/running_1.jpg'
import running_2 from './img/running_2.jpg'
import sunrise_sprint from './img/sunrise_sprint.jpg'
import google_fit_logo from './img/google_fit.png'
import azure_logo from './img/azure_logo.png'

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './Home.css'

function Home() {
  const images = [
    running_1,
    running_2,
    sunrise_sprint
  ];

  return (
    <div className="Home">
      {/* Navbar */}
      <div className="flex flex-col header w-full items-center bg-transparent justify-center absolute top-0 left-0 z-40">
        <div className="px-24 w-full container flex justify-between">
          <div className="p-3 mx-8 flex w-1/2">
            <p className="my-4 mx-12 font-bold text-slate-50">lonelywolf</p>

            <div className="flex ml-6 items-center text-slate-50">
              <Link className="px-6 text-slate-50 hover:underline underline-offset-1" to="/">
                <span>Home</span>
              </Link>
              <Link className="px-6 text-slate-50 hover:underline underline-offset-1" to="/game">
                <span>Play</span>
              </Link>
            </div>
          </div>

          <Link to="/login" className="mr-12 flex items-center">
            <span className="py-2 px-8 text-slate-50 border-2 border-indigo-400 rounded-full hover:bg-indigo-800">Login</span>
          </Link>
        </div>
      </div>
      {/* Headers */}
      <div className="flex flex-col w-full h-max items-center bg-transparent justify-center relative bg-blue-950 bg-gradient-to-l from-sky-900 to-blue-950 ">
        <div className="pb-68 py-72 px-4 flex flex-col container items-center z-21">
          <p className="my-3 text-8xl text-slate-50">Gamify your <span className="bg-gradient-to-r from-sky-400 to-blue-600 text-transparent bg-clip-text">running</span></p>
          <p className="my-3 text-2xl font-medium text-slate-50">for a better life!</p>
        </div>
        <img src={wolf_img} alt="Cover" className="absolute left-auto top-auto opacity-30 z-1"></img>
        <img src={arrow_down} alt="Down" className="mt-24 h-28 w-28 animate-bounce"></img>
        <div className="h-16 w-full"></div>
        <div className="flex">
          <div className="glowing">

            <span style={{ '--i': 1 }}></span>
            <span style={{ '--i': 2 }}></span>
            <span style={{ '--i': 3 }}></span>

          </div>

          <div className="glowing">

            <span style={{ '--i': 1 }}></span>
            <span style={{ '--i': 2 }}></span>
            <span style={{ '--i': 3 }}></span>

          </div>

          <div className="glowing">

            <span style={{ '--i': 1 }}></span>
            <span style={{ '--i': 2 }}></span>
            <span style={{ '--i': 3 }}></span>

          </div>

          <div className="glowing">

            <span style={{ '--i': 1 }}></span>
            <span style={{ '--i': 2 }}></span>
            <span style={{ '--i': 3 }}></span>

          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex justify-center relative w-full area">

        <div className="w-9/12 px-10 py-12 text-slate-50">
          <div className="flex flex-col items-center w-full pt-32 pb-64 border-b-1">
            <p className="font-semibold text-slate-100 text-4xl">More than <span className="text-6xl bg-gradient-to-r from-sky-400 to-blue-600 text-transparent bg-clip-text">100.000+</span> steps was run</p>
            <p className="mt-2 text-xl">Lonelywolf - The most powerful task-game for High School Students</p>
            <div className="heart mt-16">
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col items-center mb-16">
              <p className="text-6xl">Moments of the previous <span className="bg-gradient-to-r from-sky-400 to-blue-600 text-transparent bg-clip-text">events</span></p>
            </div>

            <Slide>
              <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[0]})` }}>
                  <span>Danang International Marathon - Manulife</span>
                </div>
              </div>
              <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[1]})` }}>
                  <span>Banners</span>
                </div>
              </div>
              <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[2]})` }}>
                  <span>Sunrise Sprint</span>
                </div>
              </div>
            </Slide>
          </div>


          <div className="flex flex-col items-center mt-48 mb-24">
            <p className="text-6xl text-slate-50">Our <span className="bg-gradient-to-r from-orange-400 to-red-600 text-transparent bg-clip-text">Partner</span></p>

            <div className="flex w-full justify-center items-center">
              <img className="w-96" src={google_fit_logo} alt="Google Fit Logo"></img>
              <img className="h-48" src={azure_logo} alt="Azure Logo"></img>
            </div>
          </div>
        </div>

        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

      {/* Footer */}
      <div className="flex justify-center bg-slate-900">
        <div className="flex justify-center w-5/6 py-2">
          <p className="text-slate-400 text-sm">©️ A Project of team lonelywolf - FStemDay DN 2024</p>
        </div>
      </div>
    </div>
  );
}

export default Home;