import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';

const Home = () => {
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnimalData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/animals/current');
                if (response.data) {
                    setAnimal(response.data);
                }
            } catch (error) {
                console.error('Error fetching animal data:', error);
                setError('Failed to fetch animal data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchAnimalData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="home">
            <div className="animal-section">
                {animal && (
                    <img
                        className="animal-image"
                        src={`http://localhost:5000/images/${animal.image_url.split('/').pop()}`}
                        alt={animal.name}
                    />
                )}
                <div className="animal-details">
                    {animal ? (
                        <>
                            <h1>{animal.name}</h1>
                            <p>{animal.description}</p>
                        </>
                    ) : (
                        <p>No animal data available for today.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
