const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000; // wat dis do

app.use(express.json()) // Middleware for parsing JSON bodies?

// MongoDB Connection
mongoose.connect('CONNECTION_STRING', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Successful DB connection'))
.catch(err => console.error(err)); // Catch error

// Import Mongoose models
const Character = require('./models/characterSchema');

//-----
// Define routes; can alternatively be done in file structure
app.get('/',(req, res) => {
    res.send('Hello world!');
})

// Endpoint to get a list of characters...
app.get('/api/characters', async (req,res) => {
    try {
        const characters = await Character.find();
        res.json(characters);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
})
//-----

// Server start
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});