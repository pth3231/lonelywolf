/*  
	Game.js
	Author: Phan Thai Hoa
	Team: lonelywolf
	Date: 8/11/2023
	Latest update: 10/11/2023

	Description:
	This have 3 parts: navbar, stats and task panel
	Navbar is always stuck on bottom and can be toggled by clicking.
	Stats is absolute at the left.
	Task panel will always change its height to show more contents such as tasks, quests, challenges and leaderboard.
*/

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import wolf_img from './img/wolf.png'

function Game() {
	const [name, setName] = useState("<anonymous>")
	const [str, setStr] = useState(0)
	const [def, setDef] = useState(0)
	const [agi, setAgi] = useState(0)
	const [sta, setSta] = useState(0)
	const [menu, setMenu] = useState(false)
	const [stepsCount, setStepsCount] = useState(-1)
	const navigate = useNavigate()
	const [counterObj, setCounterObj] = useState("")

	async function getData() {
		let char_data = await axios.get("http://localhost:6767/api/v1/getstatus", { timeout: 10000 })
			.then(res => {
				console.log(res.data)
				return res.data
			})
			.catch(err => {
				console.log(err)
			})
		console.log(char_data)
		if (char_data.status === true) {
			setName(char_data.figures.acc_name)
			setStr(char_data.figures.strength)
			setDef(char_data.figures.defense)
			setAgi(char_data.figures.agility)
			setSta(char_data.figures.stamina)

			let ctr = await axios.get("http://localhost:6767/api/v1/fitapi/geturl")
				.then(res => {
					return res.data
				})
				.catch(err => {
					console.error(err)
					return ""
				})
			setCounterObj(ctr)
		} else {
			navigate("/login")
		}
	}

	function handleOAuth() {
		window.open(counterObj.url, "_blank")
	}
	
	async function handleRefresh() {
		let steps = await axios.get("http://localhost:6767/api/v1/fitapi/fetch", {timeout: 2500})
			.then(res => {
				console.log(res.data)
				return res.data
			})
			.catch((e) => {
				console.error(e)
			})

		setStepsCount(steps[0])
	}

	useEffect(() => {
		getData()
	}, [])

	function toggleMenu() {
		setMenu(menu => !menu)
	}

	return (
		<div className="Game">
			{/* Stats div */}
			<div className="flex flex-col justify-between absolute top-0 left-0 w-96 h-full px-6 py-16">
				<div className="flex flex-col w-full bg-slate-800 rounded-lg py-8 border border-slate-500">
					<img className="px-16 py-16 text-slate-50" src={wolf_img} alt="Avatar" />
					<span className="px-6 my-3 text-slate-50 font-medium text-xl">Welcome, {name}!</span>
					<span className="px-10 mt-6 text-slate-50">Strength: {str}</span>
					<span className="px-10 mt-3 text-slate-50">Defense: {def}</span>
					<span className="px-10 mt-3 text-slate-50">Agility: {agi}</span>
					<span className="px-10 mt-3 text-slate-50">Stamina: {sta}</span>
					<div className="flex ml-2 mr-6 mt-10 justify-around">
						<span className="text-slate-50 px-4 py-2 bg-gradient-to-l from-slate-600 to-sky-600 border rounded-lg border-slate-200">Steps: {stepsCount}</span>
						<button className="text-slate-50" onClick={handleRefresh}>Refresh</button>
					</div>
				</div>

				<div className="flex w-full bg-slate-800 rounded-lg p-3 align-right border border-slate-500">
					<button className="text-slate-50 px-4">H1</button>
					<button className="text-slate-50 px-4">H2</button>
					<button className="text-slate-50 px-4" onClick={handleOAuth}>OAuth2</button>
				</div>
			</div>
			<div className="w-full flex">
				{/* A placeholder for Stats absolute */}
				<div className="flex flex-col top-0 left-0 w-96 h-full px-6 py-8"></div>

				{/* Task panel div */}
				<div className="px-8 py-12 flex flex-col">
					<p className="text-slate-50">
						This is where contents will be re-rendered: {(menu === false) ? 'True' : 'False'}
					</p>
					<Outlet />
				</div>
			</div>

			{/* Navigation button */}
			<button className="p-4 text-slate-50 absolute bottom-16 right-16 rounded-full bg-indigo-800" onClick={toggleMenu}>H3</button>
			{
				(menu === false) ? null : (
					<div className="absolute flex flex-col bottom-32 right-32">
						<Link to="/game/inventory" className="text-slate-50">Inventory</Link>
						<Link to="/game/guild" className="text-slate-50">Guild</Link>
						<Link to="/game/market" className="text-slate-50">Market</Link>
						<Link to="/game/quest" className="text-slate-50">Quest</Link>
						<Link to="/game/" className="text-slate-50">Task</Link>
						
						<Link to="/" className="text-slate-50">Home</Link>
					</div>
				)
			}
		</div>
	);
}

export default Game;