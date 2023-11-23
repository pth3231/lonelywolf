/*  
    Task.js
    Author: Phan Thai Hoa
    Team: lonelywolf
    Date: 7/11/2023
    Latest update: 19/11/2023

    Description:
    This have 1 main part: a division used to manage tasks
*/

import { useState } from "react"
import Panel from "./Panel"

export default function Task() {

    const [panel, setPanel] = useState(false)

    function handleTaskClick(e) {
        setPanel(panel => !panel)
    }

    return (
        <>
            <Panel 
                appear={panel} 
                callback={handleTaskClick} 
                title={"Daily steps"}>
            </Panel>
            <div className="container">
                <p className="text-4xl font-semibold text-slate-50">Task</p>
                <p className="text-slate-50 text-md mt-2">
                    There are thousands of tasks, challenges and treasures are waiting for you to achieve! Let's finish them all!
                </p>

                <div className="mt-2 flex flex-wrap">
                    <div onClick={handleTaskClick} className="px-8 py-8 bg-slate-800/80 justify-center rounded-lg shadow-lg cursor shadow-slate-500/40 mt-4 border border-slate-800/80 duration-200 hover:border-slate-500">
                        <p className="text-slate-50 text-xl font-semibold">Daily steps</p>
                        <p className="flex mt-4 w-48 flex-wrap text-slate-50 text-sm">Description: Walk 10000 steps in this day</p>
                        <p className="flex justify-end text-slate-50 text-sm mt-4">Process: {50}%</p>
                        <div className="w-full flex border-slate-50 rounded-md mt-2">
                            <div className="w-1/2 h-1 bg-gradient-to-r from-slate-700 to-sky-700 border-r-2"></div>
                            <div className="w-1/2 h-1 bg-slate-700"></div>
                        </div>
                    </div>
                </div>
                {

                }
            </div>
        </>
    )
}