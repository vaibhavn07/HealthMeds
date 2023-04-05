const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
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
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;