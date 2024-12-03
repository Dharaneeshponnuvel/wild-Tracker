import React, { useState, useEffect } from 'react';
import './PostViewPage.css';

const PostViewPage = () => {
    const [posts, setPosts] = useState([]);
    const [currentComment, setCurrentComment] = useState({});

    // Fetch posts from the backend
    useEffect(() => {
        fetch('http://localhost:5000/api/posts') // Backend API URL
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((err) => console.error('Error fetching posts:', err));
    }, []);

    // Handle like button click
    const handleLike = async (postId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
                method: 'POST',
            });
            const updatedPost = await res.json();

            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === postId ? { ...post, likes_count: updatedPost.likes } : post
                )
            );
        } catch (err) {
            console.error('Error liking post:', err);
        }
    };

    // Handle adding a comment
    const handleAddComment = async (postId) => {
        const comment = currentComment[postId] || '';
        if (!comment.trim()) return;

        try {
            const res = await fetch(`http://localhost:5000/api/posts/${postId}/comment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: 'currentUser', comment }),
            });
            const newComment = await res.json();

            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === postId
                        ? { ...post, comments: [...post.comments, newComment] }
                        : post
                )
            );
            setCurrentComment({ ...currentComment, [postId]: '' }); // Clear input for that post
        } catch (err) {
            console.error('Error adding comment:', err);
        }
    };

    // Handle comment input change for individual posts
    const handleCommentInput = (postId, value) => {
        setCurrentComment({ ...currentComment, [postId]: value });
    };

    return (
        <div className="post-view-page">
            <h1>Post Feed</h1>
            {posts.length === 0 ? (
                <p>Loading posts...</p>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="post-card">
                        <img
                            src={post.image_url} // Ensure the backend provides the correct image URL
                            alt={post.description}
                            className="post-image"
                        />
                        <div className="post-content">
                            <h3>Description:</h3>
                            <p>{post.description}</p>
                            <h4>Location:</h4>
                            <p>{post.location}</p>
                        </div>

                        <div className="post-actions">
                            <button onClick={() => handleLike(post.id)} className="like-button">
                                ❤️ {post.likes_count} Likes
                            </button>

                            <div className="comment-input">
                                <input
                                    type="text"
                                    placeholder="Add a comment"
                                    value={currentComment[post.id] || ''}
                                    onChange={(e) =>
                                        handleCommentInput(post.id, e.target.value)
                                    }
                                />
                                <button
                                    onClick={() => handleAddComment(post.id)}
                                    className="comment-button"
                                >
                                    Comment
                                </button>
                            </div>
                        </div>

                        <div className="comments-section">
                            <h4>Comments:</h4>
                            {post.comments.length === 0 ? (
                                <p>No comments yet.</p>
                            ) : (
                                post.comments.map((comment, index) => (
                                    <div key={index} className="comment">
                                        <strong>{comment.user}</strong>: {comment.comment}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default PostViewPage;
