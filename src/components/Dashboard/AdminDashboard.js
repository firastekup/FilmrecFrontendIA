// src/components/Dashboard/AdminDashboard.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <nav>
                <ul>
                    <li><Link to="/add-film">Add Film</Link></li>
                    <li><Link to="/films">View Films</Link></li>
                    <li><Link to="/dashboard/user">User Dashboard</Link></li>
                </ul>
            </nav>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AdminDashboard;
