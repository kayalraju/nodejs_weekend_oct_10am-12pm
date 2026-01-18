const { hashedPassword, comparePassword } = require("../helper/authHelper");
const { statusCodes } = require("../helper/statusCode");
const jwt=require('jsonwebtoken')
const transporter = require("../utils/emailConfig");
const User=require('../model/user');
const sendEmailVerificationOTP = require("../utils/sendMail");
const OtpModel=require('../model/otpModel')
const bcrypt=require('bcryptjs')

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

    async resetPasswordLink(req,res){
       try{
        const { email } = req.body;
        if (!email) {
          return res.status(400).json({ status:false, message: "Email field is required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ status:false, message: "Email doesn't exist" });
        }
        // Generate token for password reset
        const secret = user._id + process.env.JWT_SECRECT;
        const tokenLink = jwt.sign({ userID: user._id }, secret, { expiresIn: '20m' });
        // Reset Link and this link generate by frontend developer
        const resetLink = `${process.env.FRONTEND_HOST}/account/reset-password-confirm/${user._id}/${tokenLink}`;
        console.log(resetLink);
        // Send password reset email  
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "Password Reset Link",
          html: `<p>Hello ${user.name},</p><p>Please <a href="${resetLink}">Click here</a> to reset your password.</p>`
        });
        // Send success response
        res.status(200).json({ status:true, message: "Password reset email sent. Please check your email." });
  
      }catch(error){
        console.log(error);
        res.status(500).json({ status:false, message: "Unable to send password reset email. Please try again later." });
  
      }
    }


    async resetPassword(req,res){
         try{
        const { password, confirm_password } = req.body;
       const { id, token } = req.params;
       const user = await User.findById(id);
       if (!user) {
         return res.status(StatusCode.BAD_REQUEST).json({ status:false, message: "User not found" });
       }
       // Validate token check 
       const new_secret = user._id + process.env.JWT_SECRECT;
       jwt.verify(token, new_secret);
 
       if (!password || !confirm_password) {
         return res.status(400).json({ status:false, message: "New Password and Confirm New Password are required" });
       }
 
       if (password !== confirm_password) {
         return res.status(400).json({ status:false, message: "New Password and Confirm New Password don't match" });
       }
        // Generate salt and hash new password
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);
  
        // Update user's password
        await User.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } });
  
        // Send success response
        res.status(200).json({ status: "success", message: "Password reset successfully" });
  
     }catch(error){
       return res.status(500).json({ status: "failed", message: "Unable to reset password. Please try again later." });
     }
}
    }




module.exports=new AuthController();