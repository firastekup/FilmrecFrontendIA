// src/components/Dashboard/AdminDashboard.js

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('role');
        localStorage.removeItem('username');  // Clear the username from localStorage
        navigate('/login');
    };

    return (
        <div style={dashboardStyle}>
            <header style={headerStyle}>
                <h2>Welcome, {username || 'Admin'}</h2>  {/* Display the username */}
                <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
            </header>
            <nav style={navStyle}>
                <ul style={navListStyle}>
                    <li><Link to="/add-film" style={navLinkStyle}>Add Film</Link></li>
                    <li><Link to="/films" style={navLinkStyle}>View Films</Link></li>
                    <li><Link to="/abonnements/create" style={navLinkStyle}>Add Abonnement</Link></li>
                    <li><Link to="/dashboard/user" style={navLinkStyle}>User Dashboard</Link></li>
                </ul>
            </nav>
        </div>
    );
};

// Styling for Admin Dashboard
const dashboardStyle = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#111',
    color: '#fff',
    minHeight: '100vh',
    padding: '20px',
};

const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
};

const logoutBtnStyle = {
    padding: '10px 20px',
    backgroundColor: '#e50914',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '5px',
};

const navStyle = {
    backgroundColor: '#222',
    padding: '15px',
    borderRadius: '8px',
};

const navListStyle = {
    listStyleType: 'none',
    paddingLeft: '0',
};

const navLinkStyle = {
    color: '#fff',
    textDecoration: 'none',
    display: 'block',
    padding: '10px 0',
    borderBottom: '1px solid #444',
    transition: 'background-color 0.3s',
};

export default AdminDashboard;
