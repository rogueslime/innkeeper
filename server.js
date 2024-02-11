const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const characterRoutes = require('./routes/characters');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 4000; // wat dis do

app.use(cors()); // set up to only use my origin eventually

app.use(express.json()) // Middleware for parsing JSON bodies?

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/InnkeeperDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Successful DB connection'))
    .catch(err => console.error(err)); // Catch error

// Import Mongoose models
const Character = require('./models/characterSchema');
const User = require('./models/user')

//-----
// Define routes; can alternatively be done in file structure
app.get('/api', (req, res) => {
    res.send('Hello world!');
});

app.use('/api/characters', characterRoutes);

app.use('/api/auth', authRoutes);
//-----

// Server start
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});