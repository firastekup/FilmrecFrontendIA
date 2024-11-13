import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';  // Importation du fichier CSS externe

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
        <div className="dashboard">
            {/* Left Sidebar */}
            <div className="left-bar">
                <h2 className="logo">Admin Dashboard</h2>
                <div className="navigation-container">
                    <nav className="navigation">
                        <ul>
                            <li><Link to="/add-film" className="nav-link">Add Film</Link></li>
                            <li><Link to="/films" className="nav-link">View Films</Link></li>
                            <li><Link to="/abonnements/create" className="nav-link">Add Abonnement</Link></li>
                            <li><Link to="/dashboard/user" className="nav-link">User Dashboard</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Right Content Area */}
            <div className="right-bar">
                <header className="header">
                    <div className="header-info">
                        <h2>Welcome, {username || 'Admin'}</h2>
                        <p className="role-text">You have full administrative access.</p>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </header>

                <div className="content">
                    <h3 className="section-title">Admin Actions</h3>
                    <p className="section-description">Manage films, subscriptions, and user accounts from the left sidebar. Select any section to get started.</p>

                    <div className="dashboard-cards">
                        <div className="card">
                            <h4>Film Management</h4>
                            <p>Update, view, or add new films to the system.</p>
                            <Link to="/films" className="card-link">Go to Films</Link>
                        </div>
                        <div className="card">
                            <h4>Subscription Management</h4>
                            <p>Add and manage subscriptions for users.</p>
                            <Link to="/abonnements/create" className="card-link">Manage Subscriptions</Link>
                        </div>
                        <div className="card">
                            <h4>User Management</h4>
                            <p>View or manage users' details and roles.</p>
                            <Link to="/dashboard/user" className="card-link">Manage Users</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
