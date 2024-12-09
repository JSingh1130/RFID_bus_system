const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    UID: {
        type: String,
        required: false,  // Not required initially if Firebase auth is optional
        unique: true      // Ensure that the UID is unique
    },
    balance: {
        type: Number,
        default: 0 // You can set a default balance if needed
    }
})

const user = mongoose.model("user", userSchema);
module.exports = user;