const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    skills: {
        type: [String],  // Array of strings to store multiple skills
        default: []
    },
    interests: {
        type: [String],  // Array of strings to store multiple interests
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
