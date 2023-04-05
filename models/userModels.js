const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String,
        required: true
    },
    address: String,
    
    mobile:{
        type: Number,
        required: true
    } 
});
const User = mongoose.model('User', userSchema);

module.exports = User;