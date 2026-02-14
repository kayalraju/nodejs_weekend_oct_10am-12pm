const limiter=require('express-rate-limit');



const Limiter=limiter({
    windowMs:1*60*1000,
    max:5,
    message:"You have exceeded the limit of 5 requests in 1 minutes"
})
module.exports=Limiter