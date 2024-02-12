const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        // Extracts token from header
        const token = req.header('Authorization').replace('Bearer ','');

        // Validates if there's a token
        if (!token) {
            console.log('tokenless fellow');
            return res.status(401).send({ error: 'No token.'});
        }

        // Decode & verify token by comparing to UserIDs (decoded token is _id)
        console.log('Token: ', token);
        const decoded = jwt.verify(token, 'secretKey'); // Need new secretKey for prod
        console.log('Token deocoded: ',decoded);
        const user = await User.findOne({ _id: decoded._id });

        if (!user) {
            console.log('no user found');
            throw new Error();
        }

        console.log('Authenticated: ', user.username);

        req.user = user;
        next();
    } catch(error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = auth;