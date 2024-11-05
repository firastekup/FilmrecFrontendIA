// src/components/Film/FilmList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FilmList.css'; // Assurez-vous d'importer le fichier CSS

const FilmList = () => {
    const [films, setFilms] = useState([]);

    const fetchFilms = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/films/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            });
            setFilms(response.data);
        } catch (error) {
            console.error(error);
            alert('Failed to fetch films');
        }
    };

    useEffect(() => {
        fetchFilms();
    }, []);

    return (
        <div className="film-list">
            <h2>Film List</h2>
            <div className="film-grid">
                {films.length > 0 ? (
                    films.map((film) => (
                        <div className="film-card" key={film.id}>
                            <img src={film.image} alt={film.title} className="film-image" />
                            <div className="film-info">
                                <h3 className="film-title">{film.title}</h3>
                                <p className="film-description">{film.description}</p>
                                <p className="film-release">Release Date: {film.release_date}</p>
                                <p className="film-genre">Genre: {film.genre}</p>
                                <p className="film-duration">Duration: {film.duration} minutes</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No films available.</p>
                )}
            </div>
        </div>
    );
};

export default FilmList;
