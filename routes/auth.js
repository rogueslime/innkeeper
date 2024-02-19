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

// Assign new email to account.
router.post('/change-email', authMiddleware, async (req, res) => {
    try {
        console.log('REQ BODY //// ',req.body);
        const { newEmail } = req.body;
        const user = req.user;
        const emailToken = crypto.randomBytes(20).toString('hex');

        user.email = newEmail;
        user.tokenVerified = false;
        user.verificationToken = emailToken;

        await user.save();
        // Possibly need to save new user to local users cache for email update
        res.status(200).json({ message: 'Email updated successfully', user: user });
    } catch(error) {
        console.error('Error updating email: ',error);
        res.status(500).json({ message: 'Error updating email,', error: error.message });
    }
});

// Resend verification token to email.
router.post('/reverify', authMiddleware, async(req, res) => {
    console.log('beginning reverification');
    const user = req.user;
    console.log('user grabbed... email: ',user.email,' vToken: ',user.verificationToken);
    try {
        await sendEmailVerification(user.email, user.verificationToken);
        res.status(201).json({ message: 'reverification email sent.' })
    } catch (error) {
        res.status(500).json({ message: "Server error during reverification", error: error.message })
    }
});

module.exports = router;