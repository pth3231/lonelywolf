/*  
    Task.js
    Author: Phan Thai Hoa
    Team: lonelywolf
    Date: 7/11/2023
    Latest update: 19/11/2023

    Description:
    This have 1 main part: a division used to manage tasks
*/

import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "universal-cookie"
import config from '../config.json'
import { useGlobalStorage } from "../state/globalStorage"

export default function Task() {
    const [isAvailable, setIsAvailable] = useState(true)
    const [panel, setPanel] = useState(false)
    const [dailyTask, setDailyTask] = useState([])
    const steps_archieved = useGlobalStorage((state) => state.steps)

    const cookies = new Cookies(null, { path: '/' })

    function handleTaskClick(e) {
        setPanel(panel => !panel)
    }

    async function fetchData() {
        const auth_info = {
            token: cookies.get("token"),
            username: cookies.get("username")
        }
        console.log(auth_info.token)
        console.log(auth_info.username)
        try {
            let task_list = await axios.post(`${config.api_url}/api/v1/gettask`, auth_info, { timeout: 10000 })
                .then(res => {
                    console.log(res.data.random_task_list)
                    return res.data.random_task_list
                })
                .catch(err => {
                    console.log(err)
                })
            console.log(task_list)
            setDailyTask(task_list)
            if (setDailyTask.length === 0)
                setIsAvailable(false)
        } catch (e) {
            setIsAvailable(false)
            console.error(e)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="h-full w-full">
            <p className="text-4xl font-semibold text-slate-50">Task</p>
            <p className="text-slate-50 text-md mt-2">
                There are thousands of tasks, challenges and treasures are waiting for you to achieve! Let's finish them all!
            </p>
            {
                (isAvailable === true && dailyTask.length !== 0) ? dailyTask.map(item =>
                    <div className="mt-2 flex flex-wrap" key={item.id}>
                        <div onClick={handleTaskClick} className="px-8 py-8 bg-slate-800/80 justify-center rounded-lg shadow-lg cursor shadow-slate-500/40 mt-4 border border-slate-800/80 duration-200 hover:border-slate-500">
                            <p className="text-slate-50 text-xl font-semibold">{item.title}</p>
                            <p className="flex mt-4 w-48 flex-wrap text-slate-50 text-sm">{item.desc}</p>
                            <p className="flex justify-end text-slate-50 text-sm mt-4">
                                Process: {((steps_archieved / item.steps * 100) > 100) ? 100 : (steps_archieved / item.steps * 100).toPrecision(4)}%
                            </p>
                            
                            <div className="flex h-2 mt-4 bg-slate-600 rounded-lg">
                                <div className="bg-gradient-to-r from-slate-500 to-sky-600 rounded-lg" 
                                    style={{
                                        width: `${((steps_archieved / item.steps * 100) > 100) ? 100 : (steps_archieved / item.steps * 100)}%` 
                                    }}>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                (panel) ?
                    <div className="flex flex-col fixed top-0 left-0 w-screen h-screen bg-slate-50/30 z-1 duration-200">
                        <button onClick={handleTaskClick} className="text-slate-50">x</button>
                        <div className="flex flex-col bg-slate-900/70">
                            <span className="text-slate-50">Title</span>
                            <span className="text-slate-50">description</span>
                            <span className="text-slate-50">process</span>
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}