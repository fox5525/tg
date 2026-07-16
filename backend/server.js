const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Penguin Data System API' });
});

const authRoutes = require('./routes/authRoutes');
const penguinRoutes = require('./routes/penguinRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/penguins', penguinRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
