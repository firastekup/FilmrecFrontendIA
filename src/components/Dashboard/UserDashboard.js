// src/components/Dashboard/UserDashboard.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Supprime le token et le rôle de localStorage
        localStorage.removeItem('access');
        localStorage.removeItem('role');
        
        // Redirige vers la page de connexion
        navigate('/login');
    };

    return (
        <div>
            <h2>User Dashboard</h2>
            <nav>
                <ul>
                    <li><Link to="/films">View Films</Link></li>
                </ul>
            </nav>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default UserDashboard;
