// For all mongoose operation use awaitm since it returns a promise.
// For all bcrypt operation use await, since it returna a promice
// Express async handler handles the failed scenarios and automatically bipassed to errorhandler

const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @desc Register the user
// @route POST /api/user/register
// @access Public
const registerUser = asyncHandler(async(req, res) =>{
    const {userName, email, password} = req.body;
    if(!userName || !email || !password) {
        res.status(404);
        throw new Error('All fields are mandatory!');
    }
    const prevUser = await userModel.findOne({email});
    if(prevUser) {
        res.status(400);
        throw new Error('User already registered!')
    }
    const hashPassword = await bcrypt.hash(password, 10);
    var user = await userModel.create({userName, email, password: hashPassword});
    if(user) {
        res.status(201).json({
            id: user.id,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('User data is not valid');
    }
});

// @desc Login the user
// @route POST /api/user/login
// @access Public
const loginUser = asyncHandler(async(req, res) =>{
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error('Required credentials are missing')
    }
    const user = await userModel.findOne({email});
    if(user && bcrypt.compare(password, user.password)) {
        // Generate jw token
        const accessToken = jwt.sign(
           {user: {userName: user.userName,
            email: user.email,
            id: user.id}},
            process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15m'
        })
        res.status(200).json({accessToken});
    } else {
        res.status(401);
        throw new Error('Email or password is not valid');
    }
});

// @desc Login the user
// @route GET /api/user/current
// @access private
const currentUser = asyncHandler(async(req, res) =>{
    res.json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
}