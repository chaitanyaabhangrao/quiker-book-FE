import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post('https://quiker-book.onrender.com/api/auth/register', { name, email, password });
      alert("Registration successful! Please login.");
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-blue-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl px-8 py-10 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account ✨</h1>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Name</label>
          <input
            className="border rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Email</label>
          <input
            className="border rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-1">Password</label>
          <input
            className="border rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            type="password"
            placeholder="********"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-xl transition duration-200 shadow"
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-green-500 font-semibold hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
