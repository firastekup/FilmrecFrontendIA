// src/components/Film/AddFilm.js

import React, { useState } from 'react';
import axios from 'axios';

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
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            });
            alert('Film added successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to add film');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Film</h2>
            <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
            <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
            <input type="date" name="release_date" onChange={handleChange} required />
            <input type="text" name="genre" placeholder="Genre" onChange={handleChange} required />
            <input type="number" name="duration" placeholder="Duration (in minutes)" onChange={handleChange} required />
            <input type="file" name="image" onChange={handleFileChange} required />
            <input type="text" name="abonnement" placeholder="Abonnement ID" onChange={handleChange} required />
            <button type="submit">Add Film</button>
        </form>
    );
};

export default AddFilm;
