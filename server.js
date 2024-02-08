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

// Endpoint to get a list of characters. Returns 4 characters. Supports pagination.
app.get('/api/characters', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Find current page number. Default to 1.
    const limit = parseInt(req.query.limit) || 4; // Number of items per page. Default to 4.
    const skipIndex = (page - 1) * limit; // Calculates the starting index for your page.

    try {
        const characters = await Character
            .find()
            .sort({_id: 1}) // Sorts by the ID field for a consistent output. Change to sort to date added, ascending for better functionality.
            .limit(limit) // limits the number of responses
            .skip(skipIndex); // skips to the current index
        const totalCount = await Character.countDocuments(); // gathers a total count of all documents in the DB

        res.json({
            characters,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({message: error.message});
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

// Endpoint to delete a character.
app.delete('/api/characters/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCharacter = await Character.findByIdAndDelete(id);
        console.log('Deleted character: ',deletedCharacter);

        if(!deletedCharacter) {
            return res.status(404).json({message: 'Character not found.'});
        }
        res.status(200).json({ message: 'Character successfully deleted. '});
    } catch (error) {
        res.status(500).json({ message: 'Server error ', error: error.message });
    }
});
//-----

// Server start
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});