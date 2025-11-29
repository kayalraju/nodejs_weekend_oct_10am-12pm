const multer=require('multer');


const FILE_TYPE_MAP={
    "image/png":"png",
    "image/jpeg":"jpg",
    "image/jpg":"jpg",
    "image/gif":"gif"
}


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        const isValid=FILE_TYPE_MAP[file.mimetype]
        let uploadError=new Error('invalid image type')
        if(isValid){
            uploadError=null
        }
        cb(uploadError,'uploads')
    },
    filename:function(req,file,cb){
       const fileName=file.originalname.split(' ').join('-')
       const extension=FILE_TYPE_MAP[file.mimetype]
       cb(null,`${fileName}-${Date.now()}.${extension}`)
    }
})

const studentImageUploads=multer({storage:storage})

module.exports=studentImageUploads