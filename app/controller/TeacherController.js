
const { Teacher } = require('../models');



class Teacher{
     async createTeacher(req, res) {
        try {
            const { name, phone, address} = req.body;
            
            const techer = await Teacher.create({ name, phone, address});

            return res.status(201).json({
                message: "teacher created successfully",
                techer
            });
        } catch (err) {
            return res.status(500).json({ message: "Server error" });
        }
    }


}


module.exports = new Teacher();