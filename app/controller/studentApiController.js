
const Student=require('../model/studentModel');


class StudentApiController{


    async createStudent(req,res){ 
        try{

            const {name,email,phone,address}=req.body;

            const studentdata=new Student({
                name,
                email,
                phone,
                address
            });

            const data=await studentdata.save();
         if(data){
           return res.status(201).json({
                success:true,
                message:'Student created successfully',
                data:data
            });
         }
        }catch(err){
            return res.status(500).json({
                success:false,
                message:err.message,
                
            });
        }
    }


    async getStudents(req,res){
        try{
            const data=await Student.find();
            if(data){
                return res.status(200).json({
                    success:true,
                    total:data.length,
                    message:'Students fetched successfully',
                    data:data
                });
            }
        }catch(err){
            return res.status(500).json({
                success:false,
                message:err.message
            });
        }
    }


    async getsingleStudents(req,res){
        try{
            const id=req.params.id;
            const data=await Student.findById(id);
            if(data){
                return res.status(200).json({
                    success:true,
                    message:'get single data',
                    data:data
                });
            }

        }catch(err){
            return res.status(500).json({
                success:false,
                message:err.message
            });
        }
    }


    async updateStudent(req,res){
        try{
            const id=req.params.id;

            const data=await Student.findByIdAndUpdate(id,req.body);
            if(data){
                return res.status(200).json({
                    success:true,
                    message:'student updated successfully',
                   
                });
            }
        }catch(err){
            return res.status(500).json({
                success:false,
                message:err.message
            });
        }

    }

    async deleteStudent(req,res){
        try{
            const id=req.params.id;
            const data=await Student.findByIdAndDelete(id);
            if(data){
                return res.status(200).json({
                    success:true,
                    message:'student deleted successfully',
                });
            }
        }catch(err){
            return res.status(500).json({
                success:false,
                message:err.message
            });
        }
    }

}

module.exports=new StudentApiController();