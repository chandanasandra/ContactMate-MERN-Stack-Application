const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const validateToken = asyncHandler(async (req, res, next) => {
    var authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer')){
        let token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
            if(err) {
                res.status(401);
                throw new Error('User is not authorized');
            }
            console.log(decoded.user);
            req.user = decoded.user;
            next();
        });
        if(!token){
            res.status(401);
            throw new Error('User not authorized or token expired');
        }
    }

});

module.exports = validateToken;