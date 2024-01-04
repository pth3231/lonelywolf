/*  
  Game.js
  Author: Phan Thai Hoa
  Team: lonelywolf
  Date: 8/11/2023
  Latest update: 19/11/2023

  Description:
  This have 3 parts: navbar, stats and task panel
  Navbar is always stuck on bottom and can be toggled by clicking.
  Stats is absolute at the left.
  Task panel will always change its height to show more contents such as tasks, quests, challenges and leaderboard.
*/

import axios from "axios";
import Cookies from "universal-cookie";
import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useGlobalStorage } from './state/globalStorage'
import useSound from 'use-sound'

import coin_img from './img/coin.png'
import wolf_pixel from './img/wolf_pixel.png'
import dragon_img from './img/dragon.png'
import config from './config.json'

// I know there are more elegant ways to do this, but at this time I am going to do this temporarily 
import pet1 from './img/pet/pet1.png'
import pet2 from './img/pet/pet2.png'
import pet3 from './img/pet/pet3.png'
import pet4 from './img/pet/pet4.png'
import pet5 from './img/pet/pet5.png'
import pet6 from './img/pet/pet6.png'
import pet7 from './img/pet/pet7.png'
import pet8 from './img/pet/pet8.png'
import pet9 from './img/pet/pet9.png'
import pet10 from './img/pet/pet10.png'

import background_sound from './sound/background_sound.mp3'

const pet_list = [
  {
    id: 1,
    path: pet1
  },
  {
    id: 2,
    path: pet2
  },
  {
    id: 3,
    path: pet3
  },
  {
    id: 4,
    path: pet4
  },
  {
    id: 5,
    path: pet5
  },
  {
    id: 6,
    path: pet6
  },
  {
    id: 7,
    path: pet7
  },
  {
    id: 8,
    path: pet8
  },
  {
    id: 9,
    path: pet9
  },
  {
    id: 10,
    path: pet10
  }
]

function Game() {
  const [name, setName] = useState("<anonymous>")
  const [str, setStr] = useState(0)
  const [def, setDef] = useState(0)
  const [agi, setAgi] = useState(0)
  const [sta, setSta] = useState(0)
  const [coin, setCoin] = useState(0)
  const [menu, setMenu] = useState(false)
  const [petPanel, setPetPanel] = useState(false)
  const [stepsCount, setStepsCount] = useState(-1)
  const [counterObj, setCounterObj] = useState("")
  const [petPath, setPetPath] = useState(dragon_img)
  const [play, { stop }] = useSound(background_sound)
  const [toggleSound, setToggleSound] = useState(true)

  const setSteps = useGlobalStorage((state) => state.setSteps)
  const setAggregatedSteps = useGlobalStorage((state) => state.setAggregatedSteps)

  const navigate = useNavigate()
  const cookies = new Cookies(null, { path: "/" })

  useEffect(() => {
    console.log("Cookie: ", cookies.get('token'))
    axios.post(`${config.api_url}/api/v1/getstatus`, { token: cookies.get('token'), username: cookies.get('username') }, { timeout: 10000 })
      .then(res => {
        console.log(res.data)
        if (res.data.status === true) {
          setName(cookies.get('username'))
          setStr(res.data.data.atk)
          setDef(res.data.data.def)
          setAgi(res.data.data.agi)
          setSta(res.data.data.sta)
          setCoin(res.data.data.coin)
          axios.get(`${config.api_url}/api/v1/fitapi/geturl`)
            .then(res => {
              setCounterObj(res.data)
              axios.get(`${config.api_url}/api/v1/fitapi/fetch`, { timeout: 15000 })
                .then(res => {
                  console.log(res.data)
                  setAggregatedSteps(res.data)
                  console.log(`Aggregated`)
                  setStepsCount(res.data[7])
                  setSteps(res.data[7])
                })
                .catch((e) => {
                  console.warn(e)
                  console.warn("Click Refresh to use OAuth")
                })
            })
            .catch(err => {
              console.error(err)
              setCounterObj("")
            })
        } else {
          navigate("/login")
        }
      })
      .catch((e) => {
        navigate("/login")
        console.error(e)
        alert("There are errors occured during the getData() process")
      })
  }, [])

  function handleRefresh() {
    let consentScreen = window.open(counterObj.url, "_blank")
    setStepsCount(0)
    if (consentScreen) {
      const interval = setInterval(() => {
        if (consentScreen.closed) {
          clearInterval(interval)
          console.log('> Popup Closed')
          axios.get(`${config.api_url}/api/v1/fitapi/fetch`, { timeout: 15000 })
            .then(res => {
              console.log(res.data)
              setAggregatedSteps(res.data)
              console.log(`Aggregated`)
              setStepsCount(res.data[7])
              setSteps(res.data[7])
            })
            .catch((e) => {
              console.error(e)
              alert("Something was wrong! Remember to OAuth before Refresh")
              console.error("Something went wrong when we are trying to fetch the data from Google Fit API. Maybe data from your phone has not been updated yet!")
            })
        }
      }, 1000);
    }
  }

  function toggleMenu() {
    setMenu(menu => !menu)
  }

  function handlePetPanel(e) {
    setPetPanel(petPanel => !petPanel)
  }

  function handleSwitchPet(e) {
    setPetPath(e.target.src)
    console.log(`Pet changed: ${e.target.src}`)
  }

  function handleMute(e) {
    if (toggleSound)
      play()
    else
      stop()
    setToggleSound(toggleSound => !toggleSound)
  }

  return (
    <div className="Game flex dark:bg-slate-800">
      {/* Stats div */}
      <div className="flex flex-col justify-between fixed w-96 h-full px-10 py-16">
        <div className="flex flex-col w-full bg-slate-900 rounded-lg py-8 shadow-2xl shadow-sky-900">
          <img className="p-12 text-slate-50 " src={wolf_pixel} alt="Avatar"></img>
          <img className="absolute w-20 right-20 top-72" src={petPath} alt="Pet" onClick={handlePetPanel}></img>
          <span className="px-6 my-3 text-slate-50 font-medium text-xl">Welcome, {name}!</span>
          <span className="px-10 mt-6 text-slate-50">Strength: {str}</span>
          <span className="px-10 mt-3 text-slate-50">Defense: {def}</span>
          <span className="px-10 mt-3 text-slate-50">Agility: {agi}</span>
          <span className="px-10 mt-3 text-slate-50">Stamina: {sta}</span>
          <div className="flex mt-10 justify-around ">
            <span className="text-slate-50 px-4 py-2 bg-gradient-to-l from-slate-600 to-sky-600 rounded-lg shadow-lg shadow-sky-600/50">Steps: {stepsCount}</span>
            <button className="text-slate-50 border px-4 rounded-lg" onClick={handleRefresh}>Refresh</button>
          </div>
        </div>

        <div className="flex w-full bg-slate-900 rounded-lg py-3 px-6 align-right shadow-2xl shadow-sky-700">
          <div className="flex items-center">
            <span className="text-slate-50">{coin}</span>
            <img src={coin_img} alt="Coin img" className="w-5 h-5 ml-2" />
            <button className="ml-4 text-slate-50 border rounded-lg px-4 py" onClick={handleMute}>{(toggleSound) ? "Unmute" : "Mute"}</button>
          </div>
        </div>
      </div>
      <div className="flex w-screen">
        {/* A placeholder for Stats absolute */}
        <div className="flex flex-col w-96 h-full px-24 py-8 mr-9"></div>

        {/* Task panel div */}
        <div className="flex w-full px-8 py-12">
          <Outlet />
        </div>
      </div>

      {/* Navigation button */}
      <button className="p-4 w-14 text-slate-50 fixed bottom-16 right-16 rounded-full bg-indigo-800 ring-1 ring-slate-400" onClick={toggleMenu}>{"≡"}</button>
      {
        (menu === false) ? null : (
          <div className="w-36 fixed flex flex-col bottom-32 right-32 bg-gradient-to-r from-slate-900/80 to-slate-950/80 shadow-lg shadow-slate-500/50 rounded-lg border border-slate-800">
            <Link to="/game/inventory" className="text-slate-50 py-3 px-6 duration-200 hover:pl-7 hover:bg-slate-600/30">Inventory</Link>
            <Link to="/game/chart" className="text-slate-50 py-3 px-6 duration-200 hover:pl-7 hover:bg-slate-600/30">Chart</Link>
            <Link to="/game/guild" className="text-slate-50 py-3 px-6 duration-200 hover:pl-7 hover:bg-slate-600/30">Guild</Link>
            <Link to="/game/market" className="text-slate-50 py-3 px-6 duration-200 hover:pl-7 hover:bg-slate-600/30">Market</Link>
            <Link to="/game/quest" className="text-slate-50 py-3 px-6 duration-200 hover:pl-7 hover:bg-slate-600/30">Quest</Link>
            <Link to="/game/" className="text-slate-50 py-3 px-6 duration-200 hover:pl-7 hover:bg-slate-600/30">Task</Link>
            <Link to="/" className="text-slate-50 py-3 px-6 duration-200 hover:pl-7 hover:bg-slate-600/30">Home</Link>
          </div>
        )
      }
      {
        (petPanel)
          ? <div className="flex flex-col justify-center items-center bg-slate-900/20 fixed w-screen h-screen">
            <div className="flex flex-col bg-slate-700/80 rounded-lg p-6 shadow-slate-50" style={{ "height": "35rem", "width": "35rem" }}>
              <p className="text-slate-50 ml-8 mt-4" onClick={handlePetPanel}>x</p>
              <p className="text-slate-50 font-medium text-3xl my-4 flex justify-center">Pet</p>
              <div className="flex overscroll-none flex-wrap justify-center">
                {pet_list.map(img_obj =>
                  <div key={img_obj.id} className="hover:bg-slate-300 rounded-lg">
                    <img className="w-20 h-20" src={img_obj.path} alt={`Img ${img_obj.id}`} onClick={handleSwitchPet}></img>

                  </div>
                )}
              </div>
            </div>
          </div>
          : null
      }
    </div>
  );
}

export default Game;