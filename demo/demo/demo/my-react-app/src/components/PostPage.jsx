import React, { useState } from 'react';
import axios from 'axios';
import './post.css';

const PostPage = () => {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [preview, setPreview] = useState(null);

    // Handle image file selection and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(file ? URL.createObjectURL(file) : null);
    };

    // Handle form submission to send data to backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image || !description || !location) {
            alert('Please fill out all fields before submitting.');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);
        formData.append('location', location);

        try {
            // Updated endpoint: /api/posts (not /api/post)
            const response = await axios.post('http://localhost:5000/api/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Post created successfully!');
            console.log('Post created:', response.data);

            // Clear form
            setImage(null);
            setDescription('');
            setLocation('');
            setPreview(null);
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post.');
        }
    };

    return (
        <div className="post-page">
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="file-input">
                    <label htmlFor="imageInput" className="file-label">
                        Choose Image
                    </label>
                    <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="file-input-element"
                    />
                    {preview && <img src={preview} alt="Image preview" className="image-preview" />}
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Add a description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="text-input"
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Add location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="text-input"
                    />
                </div>
                <button type="submit" className="submit-button">Post</button>
            </form>
        </div>
    );
};

export default PostPage;
