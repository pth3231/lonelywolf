/*  
    Task.js
    Author: Phan Thai Hoa
    Team: lonelywolf
    Date: 7/11/2023
    Latest update: 19/11/2023

    Description:
    This have 1 main part: a division used to manage tasks
*/

import axios from "axios"
import { useEffect, useState } from "react"
import Cookies from "universal-cookie"
import config from '../config.json'
import { useGlobalStorage } from "../state/globalStorage"

export default function Task() {
    const [panel, setPanel] = useState(false)
    const [dailyTask, setDailyTask] = useState([])
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [steps, setSteps] = useState("")
    
    const steps_archieved = useGlobalStorage((state) => state.steps)

    const cookies = new Cookies(null, { path: '/' })

    function handleTaskClick(e, title, desc, steps) {
        setPanel(panel => !panel)
        setTitle(title)
        setDesc(desc)
        setSteps(steps)
    }

    function handleComplete(e) {
        alert("Button clicked")
    }

    useEffect(() => {
        const auth_info = {
            token: cookies.get("token"),
            username: cookies.get("username")
        }
        console.log(auth_info.token)
        console.log(auth_info.username)
        axios.post(`${config.api_url}/api/v1/gettask`, auth_info, { timeout: 10000 })
            .then(res => {
                let task_list = res.data.random_task_list

                console.log(task_list)
                setDailyTask(task_list)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="h-full w-full">
            <p className="text-4xl font-semibold text-slate-50">Task</p>
            <p className="text-slate-50 text-md mt-2">
                There are thousands of tasks, challenges and treasures are waiting for you to achieve! Let's finish them all!
            </p>
            <div className="flex flex-col w-4/5 mt-4">
                {
                    (dailyTask !== undefined)
                        ? (dailyTask.length !== 0)
                            ? dailyTask.map(item =>
                                <div className="bg-slate-900/80 flex flex-col mt-3 rounded-lg" key={item.id}>
                                    <div onClick={(e, title, desc, steps) => handleTaskClick(e, item.title, item.desc, item.steps)} className="px-12 py-8 justify-center rounded-lg shadow-lg cursor shadow-slate-500/40 border border-slate-800/80 duration-200 hover:border-slate-500">

                                        <p className="text-slate-50 text-xl font-semibold">{item.title}</p>
                                        <p className="flex mt-4 w-48 flex-wrap text-slate-50 text-sm">{item.desc}</p>
                                        <p className="flex justify-end text-slate-50 text-sm mt-4">
                                            Process: {((steps_archieved / item.steps * 100) > 100) ? 100 : (steps_archieved / item.steps).toPrecision(4) * 100}%
                                        </p>

                                        <div className="flex h-2 mt-4 bg-slate-600 rounded-lg">
                                            <div className="bg-gradient-to-r from-slate-500 to-sky-600 rounded-lg"
                                                style={{
                                                    width: `${((steps_archieved / item.steps * 100) > 100) ? 100 : (steps_archieved / item.steps * 100)}%`
                                                }}>
                                            </div>
                                        </div>
                                    </div>
                                    <button disabled={(steps_archieved / item.steps * 100) < 100}
                                        className="text-slate-50 border border-sky-400 mt-2 rounded-lg px-2 py-1 enabled:hover:bg-sky-400 items-center transition disabled:opacity-50"
                                        onClick={handleComplete}>
                                        Complete
                                    </button>
                                </div>
                            )
                            : console.log("dailyTask is empty")
                        : console.log("dailyTask is undefined or unavailable")
                }
            </div>
            {
                (panel) ?
                    <div className="flex flex-col fixed top-0 left-0 w-screen h-screen bg-slate-50/30 z-1 duration-200 justify-center items-center">
                        <div className="flex flex-col bg-slate-900 w-10/12 h-2/3 rounded-md">
                            <button onClick={(e, title, desc, steps) => handleTaskClick(e, "", "", 0)} className="text-slate-50 w-4 mt-3 ml-6">x</button>
                            <div className="flex flex-col px-8 py-4">
                                <span className="text-slate-50 font-semibold text-2xl">{title}</span>
                                <span className="text-slate-50 mt-2">{desc}</span>
                                <span className="text-slate-50">Process: {steps_archieved}/{steps}</span>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}