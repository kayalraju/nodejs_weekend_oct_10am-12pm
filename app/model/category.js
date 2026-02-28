const mongoose=require('mongoose')

const categorySchema= new mongoose.Schema({
    categoryName:{
        type:String,
        require:true
    },
    image:{
        type:String,
        defult:true
    },
    status: {
        type: Boolean,
        default: false,
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    createOn:{
        type: Date,
        default:new Date()
    },
    updateOn:{
        type: Date,
        default:new Date()
    },
 
})

const categoryModel=mongoose.model("category",categorySchema)
module.exports=categoryModel