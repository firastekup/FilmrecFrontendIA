// src/components/Auth/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ updateAuth }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', { username, password });
            
            // Stocke le token et le rôle
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('role', response.data.user.role);
            
            // Met à jour l'authentification et le rôle dans App.js
            updateAuth(true, response.data.user.role);
            
            // Redirige vers le tableau de bord en fonction du rôle
            const dashboardPath = response.data.user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user';
            navigate(dashboardPath);
        } catch (error) {
            console.error(error);
            alert('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleLogin} style={formStyle}>
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
        </form>
    );
};

// Style for form
const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    margin: 'auto',
};

export default Login;
