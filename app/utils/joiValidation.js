
const joi=require('joi');

const StudentSchemaValidation=joi.object({
    name: joi.string().required().min(3).max(20),
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','in'] } }),
    phone: joi.string().required().min(10).max(10),
    address: joi.string().required().min(3).max(20)
})



module.exports={StudentSchemaValidation}