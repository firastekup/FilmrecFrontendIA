// src/App.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import UserDashboard from './components/Dashboard/UserDashboard';
import AddFilm from './components/Film/AddFilm';
import FilmList from './components/Film/FilmList';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);

    // Fonction pour mettre à jour l'état d'authentification après login ou logout
    const updateAuth = (isAuth, userRole) => {
        setIsAuthenticated(isAuth);
        setRole(userRole);
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('access');
        const userRole = localStorage.getItem('role');
        if (accessToken) {
            setIsAuthenticated(true);
            setRole(userRole);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login updateAuth={updateAuth} />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/films"
                    element={isAuthenticated ? <FilmList /> : <Navigate to="/login" />}
                />
                <Route
                    path="/add-film"
                    element={isAuthenticated && role === 'admin' ? <AddFilm /> : <Navigate to="/login" />}
                />
                <Route
                    path="/dashboard/admin"
                    element={isAuthenticated && role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
                />
                <Route
                    path="/dashboard/user"
                    element={isAuthenticated && role === 'user' ? <UserDashboard /> : <Navigate to="/login" />}
                />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
