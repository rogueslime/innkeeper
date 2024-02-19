const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { sendEmailVerification } = require('../services/emailService');
const authMiddleware = require('../middleware/auth');
const authMiddlewareVerified = require('../middleware/authVerified');

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

        console.log(user);

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

// Email verification.
router.get('/verify-email/:token', async (req, res) => {
    try {
        const { token } = req.params;
        console.log('TOKEN!!!',token);
        const user = await User.findOne({ verificationToken: token });

        if(!user) {
            return res.status(404).json({ message: "No user with token found. Ignore if redirected." });
        }

        user.tokenVerified = true;
        user.verificationToken = '';
        await user.save();

        res.status(200).json({ message: "Email verified!" })
    } catch (error) {
        res.status(500).json({ message: "Server error during email verification.", error: error.message })
    }
});

router.post('/reverify', authMiddleware, async(req, res) => {
    const user = req.user;
    try {
        await sendEmailVerification(user.email, user.verificationToken);
        res.status(201).json({ message: 'reverification email sent.' })
    } catch (error) {
        res.status(500).json({ message: "Server error during reverification", error: error.message })
    }
});

module.exports = router;