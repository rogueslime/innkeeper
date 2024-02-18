const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { sendEmailVerification } = require('../services/emailService');

const router = express.Router();
const crypto = require('crypto');

// User registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Begin token generation for email verification.
        const emailToken = crypto.randomBytes(20).toString('hex');
        // Assign token to user along with other details from form
        const user = new User({
            username,
            password,
            email,
            verificationToken: emailToken,
            tokenVerified: false
        })

        // Save user
        const savedUser = await user.save();

        // Send verficiation email
        await sendEmailVerification(email, emailToken);

        res.status(201).send({ message: 'User registered & token sent.' });
    } catch(error) {
        res.status(400).send(error);
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if(!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(401).send({ error: 'Login failed!' });
        }
        const token = jwt.sign({ _id: user._id.toString() }, 'secretKey'); // replace secretKey
        res.send({ user, token });
    } catch(error) {
        res.status(400).send(error);
    }
});

module.exports = router;