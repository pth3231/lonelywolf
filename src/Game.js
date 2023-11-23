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

import coin_img from './img/coin.png'
import wolf_pixel from './img/wolf_pixel.png'
import dragon_img from './img/dragon.png'

function Game() {
	const [name, setName] = useState("<anonymous>")
	const [str, setStr] = useState(0)
	const [def, setDef] = useState(0)
	const [agi, setAgi] = useState(0)
	const [sta, setSta] = useState(0)
	const [coin, setCoin] = useState(0)
	const [menu, setMenu] = useState(false)
	const [stepsCount, setStepsCount] = useState(-1)
	const [counterObj, setCounterObj] = useState("")
	
	const navigate = useNavigate()
	const cookies = new Cookies(null, {path: "/"})

	async function getData() {
		try {
			console.log("Cookie: ", cookies.get('token'))
			let char_data = await axios.post("http://localhost:6767/api/v1/getstatus", {token: cookies.get('token'), username: cookies.get('username')}, { timeout: 10000 })
				.then(res => {
					console.log(res.data)
					return res.data
				})
				.catch(err => {
					console.log(err)
				})

			console.log(char_data)
			if (char_data.status === true) {
				setName(char_data.data.acc_name)
				setStr(char_data.data.strength)
				setDef(char_data.data.defense)
				setAgi(char_data.data.agility)
				setSta(char_data.data.stamina)
				setCoin(char_data.data.coin)
				try {
					let ctr = await axios.get("http://localhost:6767/api/v1/fitapi/geturl")
						.then(res => {
							return res.data
						})
						.catch(err => {
							console.error(err)
							return ""
						})
					setCounterObj(ctr)
				} catch (e) {
					alert("Error when trying to open Consent Window")
				}
			} else {
				navigate("/login")
			}
		} catch (e) {
			navigate("/login")
			alert("There are errors occured during the getData() process")
		}
	}

	function handleOAuth() {
		window.open(counterObj.url, "_blank")
	}

	async function handleRefresh() {
		setStepsCount(0)
		try {
			let steps = await axios.get("http://localhost:6767/api/v1/fitapi/fetch", { timeout: 5000 })
				.then(res => {
					console.log(res.data)
					return res.data
				})
				.catch((e) => {
					console.error(e)
				})

			setStepsCount(steps[0])
		} catch (e) {
			alert("Something was wrong! Remember to OAuth before Refresh")
			console.error("Something went wrong when we are trying to fetch the data from Google Fit API. Maybe data from your phone has not been updated yet!")
		}
	}

	useEffect(() => {
		getData()
	}, [])

	function toggleMenu() {
		setMenu(menu => !menu)
	}

	return (
		<div className="Game flex">
			{/* Stats div */}
			<div className="flex flex-col justify-between fixed w-96 h-full px-10 py-16">
				<div className="flex flex-col w-full bg-slate-800 rounded-lg py-8 shadow-2xl shadow-sky-900">
					<img className="p-12 text-slate-50 " src={wolf_pixel} alt="Avatar"></img>
					<img className="absolute w-20 right-20 top-72" src={dragon_img} alt="Pet"></img>
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

				<div className="flex w-full bg-slate-800 rounded-lg p-3 align-right shadow-2xl shadow-sky-700">
					<button className="text-slate-50 px-4" onClick={handleOAuth}>OAuth2</button>
					<div className="flex items-center">
						<span className="text-slate-50">{coin}</span>
						<img src={coin_img} className="w-5 h-5 ml-2"/>
					</div>
				</div>
			</div>
			<div className="flex w-screen">
				{/* A placeholder for Stats absolute */}
				<div className="flex flex-col w-96 h-full px-24 py-8 mr-9"></div>

				{/* Task panel div */}
				<div className="flex w-full md:w-9/12 px-8 py-12">
					<Outlet />
				</div>
			</div>

			{/* Navigation button */}
			<button className="p-4 w-14 text-slate-50 fixed bottom-16 right-16 rounded-full bg-indigo-800 ring-1 ring-slate-400" onClick={toggleMenu}>{"≡"}</button>
			{
				(menu === false) ? null : (
					<div className="w-36 fixed flex flex-col bottom-32 right-32 bg-gradient-to-r from-slate-900/80 to-slate-950/80 shadow-lg shadow-slate-500/50 rounded-lg border border-slate-800">
						<Link to="/game/inventory" className="text-slate-50 py-3 px-6 duration-200 hover:pl-7 hover:bg-slate-600/30">Inventory</Link>
						<Link to="/game/guild" className="text-slate-50 py-3 px-6 duration-200 hover:pl-7 hover:bg-slate-600/30">Guild</Link>
						<Link to="/game/market" className="text-slate-50 py-3 px-6 duration-200 hover:pl-7 hover:bg-slate-600/30">Market</Link>
						<Link to="/game/quest" className="text-slate-50 py-3 px-6 duration-200 hover:pl-7 hover:bg-slate-600/30">Quest</Link>
						<Link to="/game/" className="text-slate-50 py-3 px-6 duration-200 hover:pl-7 hover:bg-slate-600/30">Task</Link>
						<Link to="/" className="text-slate-50 py-3 px-6 duration-200 hover:pl-7 hover:bg-slate-600/30">Home</Link>
					</div>
				)
			}
		</div>
	);
}

export default Game;