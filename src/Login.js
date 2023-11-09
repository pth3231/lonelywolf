import { Link } from "react-router-dom";

function Login() {
    return (
      <div className="Login flex justify-center items-center w-full h-screen">
        <div className="flex flex-col container h-screen justify-center items-center">
          <form method="POST" className="flex flex-col w-1/3 h-1/2 p-12 text-slate-50 bg-gradient-to-r from-sky-900 to-indigo-900 rounded-lg">
            <Link to="/" className="relative text-sm decoration-dashed top-0 left-0">{"⇐"}</Link>
            <span className="text-2xl font-medium my-8 mx-auto">Sign in</span>
            <span className="mt-8">Username</span>
            <input></input>
            <span className="mt-8">Password</span>
            <input></input>
            <button className="mt-12 bg-indigo-600 w-36 mx-auto py-2 rounded-full">Submit</button>
            <Link to="forget-password" className="mt-2 text-sm flex justify-end">Forgot your password...</Link>
          </form>
        </div>
      </div>
    );
  }
  
  export default Login;