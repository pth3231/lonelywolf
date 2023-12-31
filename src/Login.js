import axios from "axios"
import { useState } from "react"
import Cookies from "universal-cookie"
import { Link, useNavigate } from "react-router-dom"

import return_back from './img/left_arrow.png'
import config from './config.json'

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginState, setLoginState] = useState(undefined)

    const cookies = new Cookies(null, { path: '/' })
    const navigate = useNavigate()

    function handleUsername(e) {
        setUsername(e.target.value)
        console.log(`Username: ${e.target.value}`)
    }

    function handlePassword(e) {
        setPassword(e.target.value)
        console.log(`Password: ${e.target.value}`)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setLoginState(undefined)
        const data = {
            user: username,
            pass: password
        }
        cookies.set('username', data.user)

        axios.post(`${config.api_url}/api/v1/auth/signin`, data, { timeout: 14000 })
            .then(res => {
                console.log(res.data)
                cookies.set('token', res.data.token)
                setLoginState(res.data.status)
                if (res.data.status === true) {
                    navigate("/game")
                }
            })
            .catch(err => {
                console.log("Failed to send!", err)
            })
    }

    return (
        <div className="Login flex justify-center items-center w-full h-screen dark:bg-slate-800">
            <div className="flex flex-col container justify-center items-center w-6/12">
                <form method="POST" className="flex flex-col px-12 py-24 lg:w-5/6 xl:2/3 md:w-full h-full justify-center text-slate-50 bg-gradient-to-r from-sky-900 to-indigo-900 rounded-lg">
                    <Link to="/" className="relative text-sm decoration-dashed left-0">
                        <img src={return_back} alt="Return back" className="w-6 h-6"></img>
                    </Link>
                    <span className="text-3xl font-medium my-20 mx-auto">Sign in</span>

                    {(loginState === false) ? (<p className="flex text-slate-50 bg-red-700 rounded-lg px-2 py-3 border border-red-500">Something was wrong!</p>) : null}
                    <span className="mt-8">Username</span>
                    <input type="text" name="username" onChange={handleUsername} className="mt-3 text-slate-50 bg-opacity-10 bg-slate-50 border p-1.5 rounded-lg"></input>

                    <div className="flex justify-between mt-8">
                        <span className="mt-2">Password</span>
                        <Link to="forget-password" className="mt-2 text-sm flex items-end hover:underline hover:underline-offset-1">Forgot your password</Link>
                    </div>
                    <input type="password" name="password" onChange={handlePassword} className="mt-3 text-slate-50 bg-opacity-10 bg-slate-50 border p-1.5 rounded-lg"></input>

                    <button type="submit" className="mt-12 bg-indigo-600 w-36 mx-auto py-2 rounded-full" onClick={handleSubmit}>Submit</button>
                    <Link to="/signup" className="mx-auto mt-6">Don't have an account! <b className="hover:underline hover:underline-offset-1">Sign up</b></Link>
                </form>
            </div>
        </div>
    );
}

export default Login;