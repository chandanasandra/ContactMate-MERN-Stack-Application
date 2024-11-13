const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required:[true, 'Please add the user name']
    },
    email: {
        type: String,
        required: [true, 'Please add the user email'],
        unique: [true, 'Email already taken']
    },
    password: {
        type: String,
        required: [true, 'Please add the password'],
    }
}, {timeStamp: true});

module.exports = mongoose.model('user',userSchema);