import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';

const ProfilePage = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false); // State to track if editing is enabled
    const [formData, setFormData] = useState({}); // State to manage form data

    // Fetch user profile based on the username stored in the session
    const fetchUserProfile = async () => {
        const username = localStorage.getItem('username'); // Get username from local storage
        if (!username) {
            setError('No user logged in.');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5000/api/user-details/${username}`);
            if (response.status === 200) {
                setUserDetails(response.data); // Set user details
                setFormData(response.data); // Initialize form data
            }
        } catch (error) {
            setError('Failed to load profile.'); // Handle errors
            console.error('Error fetching user profile:', error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    // Handle form data changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = localStorage.getItem('username'); // Get username from local storage
        try {
            const response = await axios.put(`http://localhost:5000/api/user-details/${username}`, formData);
            if (response.status === 200) {
                setUserDetails(formData); // Update user details with the edited data
                setIsEditing(false); // Exit edit mode
                fetchUserProfile(); // Refetch the user profile to get the updated details
            }
        } catch (error) {
            setError('Failed to update profile.');
            console.error('Error updating user profile:', error);
        }
    };

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            {error && <p className="error-message">{error}</p>}
            {userDetails ? (
                <div>
                    {!isEditing ? (
                        <div className="profile-details">
                            <p><strong>Username:</strong> {userDetails.username}</p>
                            <p><strong>Email:</strong> {userDetails.email}</p>
                            <p><strong>First Name:</strong> {userDetails.firstname}</p>
                            <p><strong>Last Name:</strong> {userDetails.lastname}</p>
                            <p><strong>Password:</strong> ******</p> {/* Mask password */}
                            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Details</button>
                        </div>
                    ) : (
                        <form className="edit-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Username"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                            />
                            <input
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                placeholder="First Name"
                                required
                            />
                            <input
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                placeholder="Last Name"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                required
                            />
                            <div className="form-actions">
                                <button type="submit">Save Changes</button>
                                <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                        </form>
                    )}
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
        </div>
    );
};

export default ProfilePage;
