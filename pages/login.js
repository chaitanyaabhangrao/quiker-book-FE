import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://quiker-book.onrender.com/api/auth/login', { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      window.location.href = "/dashboard/services";
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl px-8 py-10 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome Back 👋</h1>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Email</label>
          <input
            className="border rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-1">Password</label>
          <input
            className="border rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="password"
            placeholder="********"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-xl transition duration-200 shadow"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-purple-500 font-semibold hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}
