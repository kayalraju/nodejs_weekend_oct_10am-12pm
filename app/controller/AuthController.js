const { hashedPassword, comparePassword } = require("../helper/authHelper");
const { statusCodes } = require("../helper/statusCode");
const jwt=require('jsonwebtoken')

const User=require('../model/user');
const sendEmailVerificationOTP = require("../utils/sendMail");
const OtpModel=require('../model/otpModel')

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

         const user=await userData.save();
         sendEmailVerificationOTP(req,user)
         if(user){
            return res.status(statusCodes.CREATED).json({
                status:true,
                message:"User registered successfully and OTP sent to your email please verify your account",
                data:user
            })
         }

        }catch(error){
           return res.status(statusCodes.BAD_REQUEST).json({message:error.message})
        }   
    }

    async verifyAccount(req,res){
             try {
            const { email, otp } = req.body;
            // Check if all required fields are provided
            if (!email || !otp) {
                return res.status(400).json({ status: false, message: "All fields are required" });
            }
            const existingUser = await User.findOne({ email });

            // Check if email doesn't exists
            if (!existingUser) {
                return res.status(404).json({ status: "failed", message: "Email doesn't exists" });
            }

            // Check if email is already verified
            if (existingUser.is_verified) {
                return res.status(400).json({ status: false, message: "Email is already verified" });
            }
            // Check if there is a matching email verification OTP
            const emailVerification = await OtpModel.findOne({ userId: existingUser._id, otp });
            if (!emailVerification) {
                if (!existingUser.is_verified) {
                    // console.log(existingUser);
                    await sendEmailVerificationOTP(req, existingUser);
                    return res.status(400).json({ status: false, message: "Invalid OTP, new OTP sent to your email" });
                }
                return res.status(400).json({ status: false, message: "Invalid OTP" });
            }
            // Check if OTP is expired
            const currentTime = new Date();
            // 15 * 60 * 1000 calculates the expiration period in milliseconds(15 minutes).
            const expirationTime = new Date(emailVerification.createdAt.getTime() + 15 * 60 * 1000);
            if (currentTime > expirationTime) {
                // OTP expired, send new OTP
                await sendEmailVerificationOTP(req, existingUser);
                return res.status(400).json({ status: "failed", message: "OTP expired, new OTP sent to your email" });
            }
            // OTP is valid and not expired, mark email as verified
            existingUser.is_verified = true;
            await existingUser.save();

            // Delete email verification document
            await OtpModel.deleteMany({ userId: existingUser._id });
            return res.status(200).json({ status: true, message: "Email verified successfully" });


        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: "Unable to verify email, please try again later" });
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
            if(!user.is_verified){
                return res.status(statusCodes.BAD_REQUEST).json({message:"User is not verified"})
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