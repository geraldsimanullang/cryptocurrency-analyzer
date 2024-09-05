import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleRegister() {
    try {
      const body = {name, email, password}
      
      await axios.post(`http://localhost:3000/register`, body, {})

      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  async function googleLogin(codeResponse) {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/google-login`, null, {
        headers: {
          token: codeResponse.credential
        }
      });
      localStorage.setItem("access_token", data.access_token)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex w-screen h-screen">
      <div className="flex w-2/3 h-full"></div>
      <div className="flex w-1/3 h-full p-10 justify-center items-center">
        <form
          action="post"
          className="flex flex-col rounded-lg border-yellow-500 border-2 bg-white shadow-lg items-center p-8 h-fit w-fit gap-5"
          onSubmit={(event) => handleRegister(event)}
        >

          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-semibold">
              Name
            </label>
            <input
              type="text"
              autoComplete=""
              className="bg-gray-100 text-gray-700 border-slate-400 border-2 px-3 py-2 rounded-md w-64 focus:outline-none focus:border-yellow-500"
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-semibold">
              Email
            </label>
            <input
              type="email"
              autoComplete=""
              className="bg-gray-100 text-gray-700 border-slate-400 border-2 px-3 py-2 rounded-md w-64 focus:outline-none focus:border-yellow-500"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              className="bg-gray-100 text-gray-700 border-slate-400 border-2 px-3 py-2 rounded-md w-64 focus:outline-none focus:border-yellow-500"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button className="btn btn-warning bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out">
            Register
          </button>
          <div className="flex gap-1">
            <p className="text-black text-xs">Already have an account? </p>
            <Link to="/login" className="text-blue-600 text-xs">Login</Link>
          </div>
          <div className="divider px-10 text-gray-800">OR</div>
          <GoogleLogin onSuccess={googleLogin} />
        </form>
      </div>
    </div>
  )
}