/*  
    Home.js
    Author: Phan Thai Hoa
    Team: lonelywolf
    Date: 7/11/2023
    Latest update: 10/11/2023

    Description:
    This have 4 parts: navbar, header, main content and footer
*/

import { Link } from "react-router-dom";
import wolf_img from "./img/wolf.png"

function Home() 
{
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
            <div className="flex w-full items-center bg-transparent justify-center relative bg-blue-950 bg-gradient-to-l from-sky-900 to-blue-950 ">
                <img src={wolf_img} alt="Cover" className="absolute left-24 top-20 opacity-30 z-20"></img>
                <div className="pb-68 py-72 px-4 flex flex-col container items-center z-19">
                    <p className="my-3 text-6xl font-semibold text-slate-50">Gamify your fitness</p>
                    <p className="my-3 text-2xl font-medium text-slate-50">for a better life!</p>
                    <Link to="/game" className="mt-12 py-2 px-8 text-slate-50 bg-indigo-800 rounded-full hover:text-slate-200 hover:bg-indigo-600">Join us now!</Link>
                </div>
                
            </div>

            {/* Main content */}
            <div className="px-24 py-8 container flex flex-col relative">
                <p className="text-slate-50">lorem*asdasdasdasdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                orem*asdasdasdasdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                orem*asdasdasdasdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                orem*asdasdasdasdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                orem*asdasdasdasdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                orem*asdasdasdasdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                orem*asdasdasdasdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                orem*asdasdasdasdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
                orem*asdasdasdasdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                orem*asdasdasdasdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                orem*asdasdasdasdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
            </div>
        </div>
    );
}

export default Home;