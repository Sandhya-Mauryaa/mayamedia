// src/admin/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const host = 'http://localhost:5000';
    // const host = import.meta.env.VITE_API_URL;


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${host}/api/admin/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (data.success) {
                setIsAuthenticated(true);
                navigate("/admin/dashboard");
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError("Something went wrong");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-80"
            >
                <h2 className="text-xl font-bold mb-4">Admin Login</h2>
                {error && <p className="text-red-600 mb-2">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white w-full py-2 rounded"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
