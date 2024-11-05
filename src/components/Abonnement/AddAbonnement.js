// src/components/Abonnement/AddAbonnement.js

import React, { useState } from 'react';
import axios from 'axios';

const AddAbonnement = () => {
    const [user, setUser] = useState('');
    const [planName, setPlanName] = useState('monthly');
    const [price, setPrice] = useState(29.99);
    const [durationMonths, setDurationMonths] = useState(1);
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construire les données de l'abonnement
        const abonnementData = {
            user: parseInt(user), // Convertir en nombre si nécessaire
            plan_name: planName,
            price: parseFloat(price),
            duration_months: parseInt(durationMonths),
            end_date: endDate
        };

        try {
            const response = await axios.post('http://localhost:8000/api/abonnements/create/', abonnementData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 201) {
                alert('Abonnement créé avec succès');
                // Rediriger ou réinitialiser le formulaire si nécessaire
            }
        } catch (error) {
            console.error("Erreur lors de la création de l'abonnement:", error);
            alert('Erreur lors de la création de l’abonnement.');
        }
    };

    return (
        <div>
            <h2>Ajouter un Abonnement</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Utilisateur ID:</label>
                    <input
                        type="number"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Plan:</label>
                    <select value={planName} onChange={(e) => setPlanName(e.target.value)}>
                        <option value="monthly">Mensuel</option>
                        <option value="yearly">Annuel</option>
                    </select>
                </div>
                <div>
                    <label>Prix:</label>
                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Durée (mois):</label>
                    <input
                        type="number"
                        value={durationMonths}
                        onChange={(e) => setDurationMonths(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Date de fin:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Ajouter Abonnement</button>
            </form>
        </div>
    );
};

export default AddAbonnement;
