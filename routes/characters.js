const express = require('express');
const router = express.Router();
const Character = require('../models/characterSchema');

// Endpoint to get a list of characters. Returns 4 characters. Supports pagination.
router.get('/', async (req, res) => {
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
router.post('/', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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

module.exports = router;