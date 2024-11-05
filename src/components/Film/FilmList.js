// src/components/Film/FilmList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        <div>
            <h2>Film List</h2>
            <ul>
                {films.length > 0 ? (
                    films.map((film) => (
                        <li key={film.id}>
                            <h3>{film.title}</h3>
                            <p>{film.description}</p>
                            <p>Release Date: {film.release_date}</p>
                            <p>Genre: {film.genre}</p>
                            <p>Duration: {film.duration} minutes</p>
                            <img src={film.image} alt={film.title} style={{ width: '150px' }} />
                        </li>
                    ))
                ) : (
                    <p>No films available.</p>
                )}
            </ul>
        </div>
    );
};

export default FilmList;
