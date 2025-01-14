import { useState } from "react";
import Layout from "../../components/Layout"

import Head from "next/head";
import { useUserContext } from "../../context/UserContext";
import { toast } from "sonner";
import { useRouter } from "next/router";
export default function Login() {
    const [employeeCode, setEmployeeCode] = useState('');
    const [password, setPassword] = useState('');
    const { user, setUser } = useUserContext();
    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: employeeCode,
                password: password,
              }),
            });
      
            const data = await response.json();
            // console.log(data.accessToken)
            if (response.ok) {
              const token = data.accessToken;
              localStorage.setItem('token', token); 
              router.push("/");
            }
      
            //   const userResponse = await fetch(`http://localhost:8080/api/v1/users/${employeeCode}`, {
            //     method: 'GET',
            //     headers: {
            //       'Authorization': `Bearer ${token}`,
            //     },
            //   });
      
            //   if (userResponse.ok) {
            //     const userData = await userResponse.json();
            //     setUser(userData);
            //     console.log(userData);
            //     console.log(user);
            //     // router.push("/");
            //   } else {
            //     toast.error("Failed to fetch User");
            //   }
            // } else {
            //   toast.error(data.message || 'Authentication failed');
            // }
          } catch (err) {
            toast.error(`Something went wrong: ${err}`);
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
                    <a href="/register" className="text-indigo-500 hover:underline">
                        Sign Up
                    </a>
                    </p>
                </div>
            </div>
            
        </div>
  );
}