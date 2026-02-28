const mongoose=require('mongoose')
const Schema=mongoose.Schema

const subCategorySchema= Schema({
    subCategoryNam:{
        type:String,
        require:true
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"category"
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
    }
})

const subCategoryModel=mongoose.model("subCategory",subCategorySchema)
module.exports=subCategoryModel