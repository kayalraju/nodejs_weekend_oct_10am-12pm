const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already exists']
    },
    phone: {
        type: String,
        required: true,
        
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;