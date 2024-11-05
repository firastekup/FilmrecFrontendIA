// src/components/Film/AddFilm.js

import React, { useState } from 'react';
import axios from 'axios';
import './AddFilm.css'; // Assurez-vous d'importer le fichier CSS

const AddFilm = () => {
    const [filmData, setFilmData] = useState({
        title: '',
        description: '',
        release_date: '',
        genre: '',
        duration: '',
        image: null,
        abonnement: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilmData({ ...filmData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFilmData({ ...filmData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in filmData) {
            formData.append(key, filmData[key]);
        }

        try {
            const response = await axios.post('http://localhost:8000/api/films/create/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('access')}` // Assurez-vous que le token est valide
                }
            });
            alert('Film added successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to add film');
        }
    };

    return (
        <form className="add-film-form" onSubmit={handleSubmit}>
            <h2>Add Film</h2>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={filmData.title}
                onChange={handleChange}
                required
            />
            <textarea
                name="description"
                placeholder="Description"
                value={filmData.description}
                onChange={handleChange}
                required
            />
            <input
                type="date"
                name="release_date"
                value={filmData.release_date}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="genre"
                placeholder="Genre"
                value={filmData.genre}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="duration"
                placeholder="Duration (in minutes)"
                value={filmData.duration}
                onChange={handleChange}
                required
            />
            <input
                type="file"
                name="image"
                onChange={handleFileChange}
                required
            />
            <input
                type="text"
                name="abonnement"
                placeholder="Abonnement ID"
                value={filmData.abonnement}
                onChange={handleChange}
                required
            />
            <button type="submit">Add Film</button>
        </form>
    );
};

export default AddFilm;
