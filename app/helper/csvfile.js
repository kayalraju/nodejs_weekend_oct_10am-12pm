
const multer=require('multer');
const path=require('path');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../../public/csvupload'),function(error,success){
            if(error) throw error;
        })
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const csvupload=multer({storage:storage})

module.exports=csvupload