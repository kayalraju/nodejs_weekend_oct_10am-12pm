const limiter=require('express-rate-limit');



const Limiter=limiter({
    windowMs:15*60*1000,
    max:100,
    message:"You have exceeded the limit of 5 requests in 1 minutes"
})
module.exports=Limiter