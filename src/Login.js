import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios'

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginState, setLoginState] = useState(undefined)

    function handleUsername(e) {
        setUsername(e.target.value)
        console.log(`Username: ${e.target.value}`)
    }

    function handlePassword(e) {
        setPassword(e.target.value)
        console.log(`Password: ${e.target.value}`)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const data = {
            user: username,
            pass: password
        }

        let st = await axios.post(`http://localhost:6767/api/v1/auth/signin`, {data}, {timeout: 5000})
            .then(res => {
                console.log(res)
                console.log(res.data)
                console.log(res.data.status)
                return res.data.status
            })
            .catch(err => {console.log("Failed to send!", err)})
        setLoginState(st)
    }

    return (
        <div className="Login flex justify-center items-center w-full h-screen">
            <div className="flex flex-col container justify-center items-center">
                <form method="POST" className="flex flex-col w-1/3 h-1/2 p-12 text-slate-50 bg-gradient-to-r from-sky-900 to-indigo-900 rounded-lg">
                    {(loginState === false) ? (<p className="text-slate-50">Something is wrong!</p>) : null}
                    <Link to="/" className="relative text-sm decoration-dashed top-8 left-0">{"⇐"}</Link>
                    <span className="text-2xl font-medium my-8 mx-auto">Sign in</span>

                    <span className="mt-8">Username</span>
                    <input type="text" name="username" onChange={handleUsername} className="text-slate-900"></input>

                    <span className="mt-8">Password</span>
                    <input type="password" name="password" onChange={handlePassword} className="text-slate-900"></input>

                    <button type="submit" className="mt-12 bg-indigo-600 w-36 mx-auto py-2 rounded-full" onClick={handleSubmit}>Submit</button>
                    <Link to="forget-password" className="mt-2 text-sm flex justify-end">Forgot your password...</Link>
                </form>
                {(loginState === true) ? <Navigate to="/game" replace={true}></Navigate> : null}
            </div>
        </div>
    );
}

export default Login;