import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin(event) {
    try {
      event.preventDefault();

      const body = { email, password };

      const { data } = await axios.post(
        "http://localhost:3000/login",
        body,
        {}
      );

      localStorage.setItem("access_token", data.access_token);

      navigate("/");
    } catch (error) {
      console.log(error);
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
          onSubmit={(event) => handleLogin(event)}
        >
          
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
            Log In
          </button>
          <div className="flex gap-1">
            <p className="text-black text-xs">Don't have account yet? </p>
            <Link to="/register" className="text-blue-600 text-xs">Register</Link>
          </div>
          <div className="divider px-10 text-gray-800">OR</div>
          <GoogleLogin onSuccess={googleLogin} />
        </form>
      </div>
    </div>
  );
}
