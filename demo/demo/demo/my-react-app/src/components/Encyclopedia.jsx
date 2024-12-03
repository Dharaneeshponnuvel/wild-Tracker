import React, { useState } from 'react';
import axios from 'axios';
import AlphabetFilter from './AlphabetFilter';
import './Encyclopedia.css'
const Encyclopedia = () => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedAnimal, setSelectedAnimal] = useState(null);

    const handleLetterClick = async (letter) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://localhost:5000/animal?letter=${letter}`);
            setAnimals(response.data);
        } catch (err) {
            setError('Error fetching animal data.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAnimalClick = (animal) => {
        setSelectedAnimal(animal);
    };

    const closeModal = () => {
        setSelectedAnimal(null);
    };

    // Split animals into two columns
    const halfIndex = Math.ceil(animals.length / 2);
    const leftColumnAnimals = animals.slice(0, halfIndex);
    const rightColumnAnimals = animals.slice(halfIndex);

    return (
        <div>
            <h1>Animal List</h1>
            <AlphabetFilter onLetterClick={handleLetterClick} />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {animals.length > 0 ? (
                <div className="animal-columns">
                    <ul className="animal-column">
                        {leftColumnAnimals.map((animal) => (
                            <li key={animal.id} onClick={() => handleAnimalClick(animal)} style={{ cursor: 'pointer', color: 'blue' }}>
                                {animal.name}
                            </li>
                        ))}
                    </ul>
                    <ul className="animal-column">
                        {rightColumnAnimals.map((animal) => (
                            <li key={animal.id} onClick={() => handleAnimalClick(animal)} style={{ cursor: 'pointer', color: 'blue' }}>
                                {animal.name}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No animals found for the selected letter.</p>
            )}

            {/* Modal for animal details */}
            {selectedAnimal && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>{selectedAnimal.name}</h2>
                        <p><strong>Scientific Name:</strong> {selectedAnimal.scientific_name}</p>
                        <p><strong>Kingdom:</strong> {selectedAnimal.kingdom}</p>
                        <p><strong>Phylum:</strong> {selectedAnimal.phylum}</p>
                        <p><strong>Class:</strong> {selectedAnimal.class}</p>
                        <p><strong>Order:</strong> {selectedAnimal.order}</p>
                        <p><strong>Family:</strong> {selectedAnimal.family}</p>
                        <p><strong>Genus:</strong> {selectedAnimal.genus}</p>
                        <p><strong>Location:</strong> {selectedAnimal.location}</p>
                        <p><strong>Population Size:</strong> {selectedAnimal.estimated_population_size}</p>
                        <p><strong>Other Names:</strong> {selectedAnimal.other_names}</p>
                        <p><strong>Distinctive Features:</strong> {selectedAnimal.most_distinctive_features}</p>
                        <p><strong>Life Span:</strong> {selectedAnimal.life_span}</p>
                        <p><strong>Diet:</strong> {selectedAnimal.diet}</p>
                        <p><strong>Prey:</strong> {selectedAnimal.prey}</p>
                        <p><strong>Habitat:</strong> {selectedAnimal.habitat}</p>
                        <p><strong>Additional Info:</strong> {selectedAnimal.unnamed}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Encyclopedia;
