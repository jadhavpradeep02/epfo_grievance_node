const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, config.secret, (err, user) => {
        if(err) return res.sendStatus(401);

        req.user = user;
        next();
    })
}