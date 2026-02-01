const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const scvSchema=new Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    mobile:{
        type:String,
    }
},{timestamps:true})


const csvuser=mongoose.model('csvusermodel',scvSchema);
module.exports=csvuser;