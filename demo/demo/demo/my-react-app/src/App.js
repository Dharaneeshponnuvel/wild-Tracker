import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import SignupPage from './components/signup';
import LoginPage from './components/login';
import HomePage from './components/home';
import Dashboard from './components/dashboard';
import ProfilePage from './components/Profile';
import MapPage from './components/MapPage';
import Encyclopedia from './components/Encyclopedia';
import Viewpost from './components/Viewpost';
import AddAnimal from './components/AddAnimal';
import PostPage from './components/PostPage';
import './App.css';

// Simple Not Found component
const NotFound = () => {
    return (
        <div>
            <h2>404 - Not Found</h2>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
};

// Protected Route Wrapper Component
const ProtectedRoute = ({ isAllowed, redirectPath = '/login', children }) => {
    return isAllowed ? children : <Navigate to={redirectPath} replace />;
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const username = localStorage.getItem('username');
        const userType = localStorage.getItem('userType');

        if (username) {
            setIsAuthenticated(true);
            setIsAdmin(userType === 'admin');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('userType');
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    return (
        <Router>
            <div className="navbar">
                <div className="logo">Wild Track</div>
                <ul>
                    {isAdmin ? (
                        <>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/add-animal">Add Animal</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/map">Map</Link></li>
                            {/* Post button between Map and Encyclopedia */}
                            <li>
                                <Link to="/post" className="post-icon-button">
                                    +
                                </Link>
                            </li>
                            <li><Link to="/Viewpost">View Post</Link></li>
                            <li><Link to="/encyclopedia">Encyclopedia</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                        </>
                    )}
                </ul>
                <div className="auth-links">
                    {!isAuthenticated ? (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </>
                    ) : (
                        <button onClick={handleLogout}>Logout</button>
                    )}
                </div>
            </div>

            <Routes>
                {!isAuthenticated ? (
                    <Route path="*" element={<Navigate to="/login" replace />} />
                ) : isAdmin ? (
                    <>
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute isAllowed={isAuthenticated && isAdmin}>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/add-animal"
                            element={
                                <ProtectedRoute isAllowed={isAuthenticated && isAdmin}>
                                    <AddAnimal />
                                </ProtectedRoute>
                            }
                        />
                    </>
                ) : (
                    <>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/map" element={<MapPage />} />
                        <Route path="/encyclopedia" element={<Encyclopedia />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/post" element={<PostPage />} />
                        <Route path="/Viewpost" element={<Viewpost />} />
                    </>
                )}
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
