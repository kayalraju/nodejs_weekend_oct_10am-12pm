const Inv=require('../model/inventry');



class ComparisonController {

    async createinv(req,res){
        try{
            const data=await Inv.create(req.body);
            return res.status(200).json({
                message:"inventry created successfully",
                data:data
            });
        }catch(error){
            console.log(error);
        }
    }



    async eq(req,res){
        try{
            //const data=await Inv.find({$and:[{price:{$gt:1000}},{price:{$lt:2000}}]});
            const data=await Inv.find({$eq:{price:1000}});
            return res.status(200).json({
                message:"inventry created successfully",
                data:data
            });
        }catch(error){
            console.log(error);
        }
    }

}


module.exports=new ComparisonController();