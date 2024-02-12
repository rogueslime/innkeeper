const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        if (!token) {
            console.log('tokenless fellow');
            return res.status(401).send({ error: 'No token.'});
        }
        console.log('Token: ', token);
        const decoded = jwt.verify(token, 'secretKey');
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