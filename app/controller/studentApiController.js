const Student = require("../model/studentModel");
const fs = require("fs");
const path = require("path");
const { StudentSchemaValidation } = require("../utils/joiValidation");

class StudentApiController {
  async createStudent(req, res) {
    //console.log(req.file);

     const data={
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            address:req.body.address
        }
        const {error,value}=StudentSchemaValidation.validate(data)
        if(error){
            return res.status(401).json({
                message:error.details[0].message
            })
        }else{
            const usr=await Student.create(value)
            return res.status(200).json({
                message:'student Created Successfully',
                data:usr
            })
        }
  }

  async getStudents(req, res) {
    try {
      const data = await Student.find();
      if (data) {
        return res.status(200).json({
          success: true,
          total: data.length,
          message: "Students fetched successfully",
          data: data,
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async getsingleStudents(req, res) {
    try {
      const id = req.params.id;
      const data = await Student.findById(id);
      if (data) {
        return res.status(200).json({
          success: true,
          message: "get single data",
          data: data,
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async updateStudent(req, res) {
    try {
      const id = req.params.id;

      const data = await Student.findByIdAndUpdate(id, req.body);
      if (data) {
        return res.status(200).json({
          success: true,
          message: "student updated successfully",
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async deleteStudent(req, res) {
    try {
      const id = req.params.id;
      const data = await Student.findByIdAndDelete(id);
      if (data) {
        return res.status(200).json({
          success: true,
          message: "student deleted successfully",
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

module.exports = new StudentApiController();
