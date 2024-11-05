// src/components/Abonnement/AbonnementList.js

import React, { useEffect, useState } from 'react';

const AbonnementList = () => {
    const [abonnements, setAbonnements] = useState([]);

    useEffect(() => {
        const fetchAbonnements = async () => {
            const accessToken = localStorage.getItem('access');

            const response = await fetch('/api/abonnements/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAbonnements(data);
            } else {
                alert('Erreur lors de la récupération des abonnements.');
            }
        };

        fetchAbonnements();
    }, []);

    return (
        <div>
            <h2>Liste des Abonnements</h2>
            <ul>
                {abonnements.map((abonnement) => (
                    <li key={abonnement.id}>
                        {abonnement.plan_name} - {abonnement.price}€ pour {abonnement.duration_months} mois
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AbonnementList;
