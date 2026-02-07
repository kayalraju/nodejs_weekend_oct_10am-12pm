

const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const inventrySchema= new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    price: {
        type: String,
        required: true,
        unique: [true, 'Email already exists']
    },
    qty: {
        type: String,
        required: true
    },
    category: [
        {
            type: String,
            required: true
        }
    ]
        
})
module.exports=mongoose.model('inventry',inventrySchema)