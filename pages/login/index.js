import { useState } from "react";
import Layout from "../../components/Layout"

import Head from "next/head";
export default function Transaction() {
    const [employeeCode, setEmployeeCode] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8090/api/v1/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                employeeCode,
                password,
              }),
            });
      
            const data = await response.json();
            if (response.ok) {
              const token = data.token;
              localStorage.setItem('token', token); 
      
              const userResponse = await fetch('http://localhost:8090/api/v1/users', {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              });
      
              const userData = await userResponse.json();
              if (userResponse.ok) {
                setUser(userData);
              } else {
                setError('Failed to fetch user data');
              }
            } else {
              setError(data.message || 'Authentication failed');
            }
          } catch (err) {
            setError('Something went wrong');
          }
        
      };
    return (
        <div className="">
            <Head>
                <title>CSBU management</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/pro.ico" />
            </Head>
            
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
                    <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Login</h2>
                    <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                        htmlFor="employeeCode"
                        className="block mb-2 text-sm font-medium text-gray-600"
                        >
                        ID
                        </label>
                        <input
                        type="text"
                        id="employeeCode"
                        value={employeeCode}
                        onChange={(e) => setEmployeeCode(e.target.value)}
                        placeholder="Type your ID"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-600"
                        >
                        Password
                        </label>
                        <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Type your password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        Login
                    </button>
                    </form>
                    <p className="mt-4 text-sm text-center text-gray-600">
                    Haven't had account yet?{' '}
                    <a href="#" className="text-indigo-500 hover:underline">
                        Sign In
                    </a>
                    </p>
                </div>
            </div>
            
        </div>
  );
}