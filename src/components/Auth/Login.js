// src/components/Auth/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ updateAuth }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', { username, password });
            
            // Store token, role, and username
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('role', response.data.user.role);
            localStorage.setItem('username', response.data.user.username);  // Store username
            
            // Update authentication and role in App.js
            updateAuth(true, response.data.user.role);
            
            // Redirect based on role
            const dashboardPath = response.data.user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user';
            navigate(dashboardPath);
        } catch (error) {
            console.error(error);
            alert('Invalid credentials');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2 className="login-title">Sign In</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="login-button">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
