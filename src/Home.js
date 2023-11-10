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
            <div className="flex flex-col w-full items-center bg-transparent justify-center relative bg-gradient-to-r from-sky-900 to-indigo-900">

                <div className="pb-56 pt-48 px-4 flex flex-col container items-center">
                    <p className="my-3 text-5xl font-semibold text-slate-50">Content of header goes here!</p>
                    <p className="my-3 text-2xl font-medium text-slate-50">Content of subheader goes here!</p>
                    <Link to="/game" className="mt-12 py-2 px-8 text-slate-50 bg-indigo-800 rounded-full hover:text-slate-200 hover:bg-indigo-600">Join us now!</Link>
                </div>
            </div>

            {/* Main content */}
            <div className="px-24 py-8 container flex flex-col">
                <p className="text-slate-50">Main contents go here!</p>
            </div>
        </div>
    );
}

export default Home;