const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../image'))); // Serve images from "image" folder

// PostgreSQL Pool setup
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'wildtrack',
    password: 'Cherry@8688',
    port: 5432,
});

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../image');
        cb(null, uploadPath); // Ensure the folder exists
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    },
});
const upload = multer({
    storage,
    limits: { fileSize: 30 * 1024 * 1024 }, // Set file size limit to 30MB
});

// Helper: Log error and respond
const handleError = (res, error, message = 'Server error') => {
    console.error(message, error);
    res.status(500).json({ message, error: error.message });
};

// Endpoint to fetch all posts
app.get('/api/posts', async (req, res) => {
    try {
        const postsQuery = `
            SELECT p.id, p.image_url, p.description, p.location,
                   COALESCE(l.likes_count, 0) AS likes_count,
                   COALESCE(c.comments, '[]')::json AS comments
            FROM posts p
            LEFT JOIN (
                SELECT post_id, COUNT(*) AS likes_count
                FROM likes
                GROUP BY post_id
            ) l ON p.id = l.post_id
            LEFT JOIN (
                SELECT post_id, json_agg(json_build_object('comment', comment, 'user', username)) AS comments
                FROM comments
                GROUP BY post_id
            ) c ON p.id = c.post_id;
        `;
        const result = await pool.query(postsQuery);
        res.json(result.rows);
    } catch (error) {
        handleError(res, error, 'Error fetching posts');
    }
});

// Endpoint to like a post
app.post('/api/posts/:postId/like', async (req, res) => {
    const { postId } = req.params;
    try {
        await pool.query('INSERT INTO likes (post_id) VALUES ($1)', [postId]);
        const likesResult = await pool.query(
            'SELECT COUNT(*) AS likes_count FROM likes WHERE post_id = $1',
            [postId]
        );
        res.json({ likes: parseInt(likesResult.rows[0].likes_count, 10) });
    } catch (error) {
        handleError(res, error, 'Error liking post');
    }
});

// Endpoint to add a comment to a post
app.post('/api/posts/:postId/comment', async (req, res) => {
    const { postId } = req.params;
    const { username, comment } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO comments (post_id, username, comment) VALUES ($1, $2, $3) RETURNING *',
            [postId, username, comment]
        );
        res.json(result.rows[0]);
    } catch (error) {
        handleError(res, error, 'Error adding comment');
    }
});

// Endpoint to create a post
app.post('/api/posts', upload.single('image'), async (req, res) => {
    const { description, location } = req.body;

    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const imageUrl = `/images/${req.file.filename}`;
        const result = await pool.query(
            'INSERT INTO posts (image_url, description, location) VALUES ($1, $2, $3) RETURNING *',
            [imageUrl, description, location]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        handleError(res, error, 'Error creating post');
    }
});

// Endpoint to fetch all animals
app.get('/api/animals', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM animal');
        res.json(result.rows);
    } catch (error) {
        handleError(res, error, 'Error fetching animals');
    }
});

// Endpoint to get animal of the day
app.get('/animals/current', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM animal ORDER BY last_updated DESC LIMIT 1'
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'No animal of the day found' });
        }
    } catch (error) {
        handleError(res, error, 'Error fetching animal of the day');
    }
});
// Endpoint to find animals by the first letter
app.get('/animal', async (req, res) => {
    const letter = req.query.letter.toUpperCase();
    const query = `SELECT * FROM animals WHERE name LIKE $1`;
    const values = [`${letter}%`];

    try {
        const results = await pool.query(query, values);
        res.json(results.rows);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Database query error');
    }
});
app.get('/animals/show', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM animal');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching animals:', error);
        res.status(500).send('Server Error');
    }
});

// Endpoint to get user details by username
app.get('/api/user-details/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).send('Server Error');
    }
});

// Endpoint to update user details by username
app.put('/api/user-details/:username', async (req, res) => {
    const { username } = req.params;
    const { email, firstname, lastname, password } = req.body;

    try {
        const result = await pool.query(
            `UPDATE users
             SET email = $1, firstname = $2, lastname = $3, password = $4
             WHERE username = $5 RETURNING *`,
            [email, firstname, lastname, password, username]
        );

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).send('Server Error');
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
