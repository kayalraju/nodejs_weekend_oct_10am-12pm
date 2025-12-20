const { hashedPassword, comparePassword } = require("../helper/authHelper");
const { statusCodes } = require("../helper/statusCode");
const jwt=require('jsonwebtoken')

const User=require('../model/user');

class AuthController{

    async register(req,res){
        try{
            const {name,email,phone,password}=req.body
            if(!name || !email || !phone || !password){
                return res.status(statusCodes.BAD_REQUEST).json({message:"All fields are required"})
            }

            const existingUser=await User.findOne({email})
            if(existingUser){
                return res.status(statusCodes.BAD_REQUEST).json({message:"User Email-id already exists"})

            }
         const hashpassword= await hashedPassword(password)

        const userData= new User({
            name,
            email,
            phone,
            password:hashpassword
         })

         const data=await userData.save();
         if(data){
            return res.status(statusCodes.CREATED).json({
                message:"User registered successfully",
                data:data
            })
         }

        }catch(error){
           return res.status(statusCodes.BAD_REQUEST).json({message:error.message})
        }   
    }


    async login(req,res){

        try{
            const {email,password}=req.body
            if(!email || !password){
                return res.status(statusCodes.BAD_REQUEST).json({message:"All fields are required"})
            }
            const user=await User.findOne({email})
            console.log('user',user);
            
            if(!user){
                return res.status(statusCodes.BAD_REQUEST).json({ststus:false,message:"User not found"})

            }
             const ismatched=await comparePassword(password,user.password)
             if(!ismatched){
                return res.status(statusCodes.BAD_REQUEST).json({message:"Invalid credentials"})
             }

         const token= jwt.sign({
            _id:user._id,
            name:user.name,
            email:user.email,
            phome:user.phone
         },process.env.JWT_SECRECT||'1234',{expiresIn:'10m'})

         return res.status(statusCodes.OK).json({
            message:"User logged in successfully",
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone
            },
            token:token
         })

        }catch(error){
            return res.status(statusCodes.BAD_REQUEST).json({message:error.message})
        }   
    }


    async dashboard(req,res){
        try{
            const user=req.user
            return res.status(statusCodes.OK).json({
                message:"welcome to User dashboard",
                user
              
            })
        }catch(error){
            return res.status(statusCodes.BAD_REQUEST).json({message:error.message})
        }
    }

}



module.exports=new AuthController();