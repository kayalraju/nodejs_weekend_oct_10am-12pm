
const mongoose = require('mongoose');
const Schema=mongoose.Schema;


const studentSchema= new Schema({
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
        required: true
    },
    address: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'no-image.jpg'
    }

},{
    timestamps: true

});


const StudentModel=mongoose.model('student', studentSchema);

module.exports=StudentModel
