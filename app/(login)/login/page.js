"use client"

import { useState } from "react";
import {signIn} from 'next-auth/react';
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const [error, setError] = useState("")
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const router = useRouter();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("")
      try{
        const res = await signIn("credentials",{
          username,
          password,
          redirect:false
        });
        if(res?.error) return setError("Invalid credentials");
        router.replace('/')
      }catch(error){
        console.log(error)
      }
    };
  
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error? error.message: null}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Login
            </button>
            {error && (<div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>)}
          </form>
        </div>
      </div>
    );
  };

export default LoginPage