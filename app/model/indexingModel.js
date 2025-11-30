
const mongoose = require('mongoose');
const Schema=mongoose.Schema;


const IndexingSchema= new Schema({
    //single filed indexing
    username: { type: String},

    //compound indexing
    firstName: {
        type: String,
        required: [true, 'Please add a name']
    },
    lastName: {
        type: String,
        required: [true, 'Please add a name']
    },
   // Multikey (array field)
    tags: [String],

    // Text field
    bio: String,
    
    // Geospatial
    location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], default: [0, 0] },
    },

    // Partial index example
    isActive: Boolean,

},{
    timestamps: true

});

IndexingSchema.index({ username: 'text' });


// ✅ Compound index (firstName + lastName)
IndexingSchema.index({ firstName: 1, lastName: 1 });

const IndexingModel=mongoose.model('indexing', IndexingSchema);

module.exports=IndexingModel
