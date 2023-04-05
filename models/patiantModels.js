const mongoose = require('mongoose');

const patiantSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique:true
    },
    image:{image: ""},
    name: {
        type: String,
        required: true
    },
    phone:Number,
    address: String,
    fees: Number,
    rating: {
        type: Number,
        default: 4.6
    }
});
const patiant = mongoose.model('Patiant', patiantSchema);

module.exports = patiant;