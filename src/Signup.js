import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import axios from 'axios'

export default function Signup() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [nickname, setNickname] = useState("")
    const [loginState, setLoginState] = useState(undefined)

    function handleUsername(e) {
        setUsername(e.target.value)
        console.log(`Username: ${e.target.value}`)
    }

    function handlePassword(e) {
        setPassword(e.target.value)
        console.log(`Password: ${e.target.value}`)
    }

    function handleNickname(e) {
        setNickname(e.target.value)
        console.log(`Nickname: ${e.target.value}`)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const data = {
            user: username,
            pass: password,
            nickname: nickname
        }

        let login_state = await axios.post(`http://localhost:6767/api/v1/auth/signup`, data, {timeout: 5000})
            .then(res => {
                console.log(res)
                console.log(res.data)
                console.log(res.data.token)
                return res.data.status
            })
            .catch(err => {
                console.log("Failed to send!", err)
            })
    }
    return (
        <div className="Signup">
            <div className="Login flex justify-center items-center w-full h-screen">
                <div className="flex flex-col container justify-center items-center w-6/12">
                    <form method="POST" className="flex flex-col px-12 py-20 lg:w-5/6 xl:2/3 md:w-full h-full justify-center text-slate-50 bg-gradient-to-r from-sky-900 to-indigo-900 rounded-lg">
                        <span className="text-3xl font-medium my-20 mx-auto">Sign up</span>

                        {(loginState === false) ? (<p className="flex text-slate-50 bg-red-700 rounded-lg px-2 py-3 border border-red-500">Something was wrong!</p>) : null}
                        <span className="mt-12">Nickname</span>
                        <input type="text" name="nickname" onChange={handleNickname} className="mt-3 text-slate-50 bg-opacity-10 bg-slate-50 border p-1.5 rounded-lg"></input>

                        <span className="mt-8">Username</span>
                        <input type="text" name="username" onChange={handleUsername} className="mt-3 text-slate-50 bg-opacity-10 bg-slate-50 border p-1.5 rounded-lg"></input>

                        <span className="mt-8">Password</span>
                        <input type="password" name="password" onChange={handlePassword} className="mt-3 text-slate-50 bg-opacity-10 bg-slate-50 border p-1.5 rounded-lg"></input>

                        <button type="submit" className="mt-12 bg-indigo-600 w-36 mx-auto py-2 rounded-full" onClick={handleSubmit}>Submit</button>
                        <Link to="/" className="mx-auto mt-6">Let's go back! <b className="hover:underline hover:underline-offset-1">Home</b></Link>
                    </form>
                    {/*(loginState === true) ? <Navigate to="/login" replace={true}></Navigate> : null*/}
                </div>
            </div>
        </div>
    )
} 