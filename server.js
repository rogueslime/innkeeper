const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
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

//-----
// Define routes; can alternatively be done in file structure
app.get('/api', (req, res) => {
    res.send('Hello world!');
});

// Endpoint to get a list of characters...
app.get('/api/characters', async (req, res) => {
    try {
        const characters = await Character.find();
        res.json(characters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Endpoint to create a new character and append it to the list.
app.post('/api/characters', async (req, res) => {
    try {
        // Create character using request body
        const newCharacter = new Character(req.body);

        const savedCharacter = await newCharacter.save();

        res.status(201).json(savedCharacter);
    } catch(error) {
        res.status(500).json({ message: error.message});
    }
});
//-----

// Server start
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});