import React, { useState } from 'react';
import axios from 'axios';
import './AddAnimal.css'; // Optional: For styling

const AddAnimal = () => {
    const [newAnimal, setNewAnimal] = useState({ name: '', description: '' });
    const [selectedImage, setSelectedImage] = useState(null);

    const handleInputChange = (e) => {
        setNewAnimal({ ...newAnimal, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleAddAnimal = async () => {
        if (!newAnimal.name || !newAnimal.description || !selectedImage) {
            alert('Please fill out all fields and select an image.');
            return;
        }

        const formData = new FormData();
        formData.append('name', newAnimal.name);
        formData.append('description', newAnimal.description);
        formData.append('image', selectedImage);

        try {
            await axios.post('http://localhost:5000/api/animals', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Animal added successfully!');
            setNewAnimal({ name: '', description: '' });
            setSelectedImage(null);
        } catch (error) {
            console.error('Error adding animal:', error);
        }
    };

    return (
        <div className="add-animal">
            <h2>Add Animal</h2>
            <div className="add-animal-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newAnimal.name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newAnimal.description}
                    onChange={handleInputChange}
                />
                <input type="file" onChange={handleImageChange} />
                <button onClick={handleAddAnimal}>Add Animal</button>
            </div>
        </div>
    );
};

export default AddAnimal;
