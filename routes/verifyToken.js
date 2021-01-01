const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    console.log("hi")
    const token = req.headers.authorization;
    console.log(token)
    if(token=="") {
        console.log('access denied');
        return res.status(403).send('access denied');
    }
    

    try {
        const bearer = token.split(" ");
        const bearerToken = bearer[1];
        const verified = jwt.verify(bearerToken, 'secret');
        req.user = verified;
        next();
    } catch(err) {
        console.log(err)
        res.status(403).send('invalid token');
    }
}