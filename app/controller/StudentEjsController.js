const Student=require('../model/studentModel');

class StudentEjsController{

    async list(req,res){
        try{
            const data=await Student.find();
             res.render('studentlist',{
                data:data
             });

        }catch(error){
            console.log(error);
            
        }
    }
    async addView(req,res){
        try{
             res.render('addstudent');

        }catch(error){
            console.log(error);
            
        }
    }
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
            console.log('data',data);
            
         if(data){
           res.redirect('/student/list');
         }
        }catch(err){
            console.log(err);
        }
    }

}




module.exports=new StudentEjsController();