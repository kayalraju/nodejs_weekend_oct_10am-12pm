const jwt=require('jsonwebtoken')



const AuthCheck=async(req,res,next)=>{
    const token= req?.body?.token || req?.query?.token || req?.headers['x-access-token']||req?.headers['authorization'];
    if(!token){
        return res.status(401).json({message:"Token is required"});
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRECT||'1234');
        req.user=decoded;
      

    }catch(error){
        return res.status(401).json({message:"Invalid token"});
    }

    return next();
}   

    

module.exports=AuthCheck    

