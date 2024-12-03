import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [animals, setAnimals] = useState([]);

    // Fetch animals on component load
    useEffect(() => {
        fetchAnimals();
    }, []);

    const fetchAnimals = async () => {
        try {
            const response = await axios.get('http://localhost:5000/animals/show');
            setAnimals(response.data);
        } catch (error) {
            console.error('Error fetching animals:', error);
        }
    };

    const handleDeleteAnimal = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/animals/${id}`);
            fetchAnimals();
        } catch (error) {
            console.error('Error deleting animal:', error);
        }
    };

    return (
        <div className="dashboard">
            <h2>Animal Dashboard</h2>
            <div className="animal-list">
                {animals.length > 0 ? (
                    animals.map((animal) => (
                        <div key={animal.id} className="animal-item">
                            <img
                                src={`http://localhost:5000/images/${animal.image_url.split('/').pop()}`}
                                alt={animal.name}
                                style={{
                                    width: '100px',
                                    height: 'auto',
                                    borderRadius: '5px',
                                    marginBottom: '10px',
                                }}
                            />
                            <h3>{animal.name}</h3>
                            <p>{animal.description}</p>
                            <button onClick={() => handleDeleteAnimal(animal.id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No animals available.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
