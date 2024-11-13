import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FilmList.css';
import { useNavigate } from 'react-router-dom';

const FilmList = () => {
    const [films, setFilms] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFilms, setFilteredFilms] = useState([]);
    const navigate = useNavigate();

    const fetchFilms = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/films/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            });
            setFilms(response.data);
            setFilteredFilms(response.data); // Initialiser les films filtrés
        } catch (error) {
            console.error(error);
            alert('Failed to fetch films');
        }
    };

    useEffect(() => {
        fetchFilms();
    }, []);

    useEffect(() => {
        const results = films.filter(film =>
            film.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            film.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFilms(results);
    }, [searchTerm, films]);

    return (
        <div className="film-list">
            <button className="back-button" onClick={() => navigate(-1)}>◀ Back</button>
            <h2>Film Collection</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for a film..."
                    className="search-bar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="film-grid">
                {filteredFilms.length > 0 ? (
                    filteredFilms.map((film) => (
                        <div className="film-card" key={film.id}>
                            <img src={film.image} alt={film.title} className="film-image" />
                            <div className="film-info">
                                <h3 className="film-title">{film.title}</h3>
                                <p className="film-description">{film.description}</p>
                                <div className="film-meta">
                                    <p><strong>Release:</strong> {film.release_date}</p>
                                    <p><strong>Genre:</strong> {film.genre}</p>
                                    <p><strong>Duration:</strong> {film.duration} mins</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-films-message">No films match your search.</p>
                )}
            </div>
        </div>
    );
};

export default FilmList;
