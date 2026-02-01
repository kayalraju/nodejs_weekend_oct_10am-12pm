const csv=require('csvtojson');
const fs=require('fs');
const CSVModel=require('../model/csvmodel');

class CsvController{

    async create(req,res){
        try{
            const userData=[]

            csv().fromFile(req.file.path)
            .then(async(response)=>{
                for(let i=0;i<response.length; i++){
                    userData.push({
                        name:response[i].name,
                        email:response[i].email,
                        mobile:response[i].mobile,
                    })
                }

                const datas=await CSVModel.insertMany(userData)

                return res.status(201).json({
                    message:"csv data inserted successfully",
                    data:datas
                })
            })

        }catch(error){
            console.log(error)

        }

    }

    async getdata(req,res){
        try{
            const data=await CSVModel.find();
            return res.status(200).json({
                message:"csv data fetched successfully",
                total:data.length,
                data:data
            })
        }catch(error){
            console.log(error)
        }
    }
}


module.exports=new CsvController()