const Employee = require("../model/employeeModel");

class EmployeeController {
  async createEmployee(req, res) {
    try {
      const { firstName, lastName, gender, email, salary, department } =
        req.body;

      if (
        !firstName ||
        !lastName ||
        !gender ||
        !email ||
        !salary ||
        !department
      ) {
        return res.status(400).json({
          message: "Please fill all required fields",
        });
      }

      const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee) {
        return res.status(400).json({
          message: "Employee with this email already exists",
        });
      }

      const employee = new Employee({
        firstName,
        lastName,
        gender,
        email,
        salary,
        department,
      });

      const savedEmployee = await employee.save();

      return res.status(200).json({
        message: "Employee created successfully",
        data: savedEmployee,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error creating employee",
        error: err.message,
      });
    }
  }

  async getAllEmployees(req, res) {
    try {
      const employees = await Employee.find();
      return res.status(200).json({
        message: "Employees fetched successfully",
        data: employees,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error fetching employees",
        error: err.message,
      });
    }
  }

  async match(req, res) {
    try {
      const data = await Employee.aggregate([
        // {
        //     $match: {
        //         $and: [
        //           { salary: { $gt: 2000 } },
        //           { salary: { $lt: 5000 } },
        //         ],
        //       },
        // }

        {
          $match: { gender: "male" },
        },
        {
          $project: {
            firstName: 1,
            lastName: 1,
            department: 1,
          },
        },
        {
          $sort: { salary: -1 },
        },
      ]);

      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  }

  async group(req, res) {
    try {
      const data = await Employee.aggregate([
        // {
        //     $group:{_id:"$department",count:{$sum:1}}
        // }
        // { $match: { gender: "male" } },
        // { $group: { _id: "$department.name", totalEmployees: { $sum: 1 } } },

        //total employees in each department
        // {
        //   $group: {
        //     _id: "$department.name",
        //     totalEmployees: { $sum: 1 },
        //   },
        // },
        //total salary in each department
        // {
        //   $group: {
        //     _id: "$department.name",
        //     totalSalary: { $sum: "$salary" },
        //   },
        // },
        // {
        //   $sort: { totalSalary: -1 },
        // },
        // {

        //     $limit: 3
        // }

        //addfiled

        {

            $addFields: {
              totalSalary: { $sum: "$salary" },
              company:"webskitters"
            },

        }
      ]);
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new EmployeeController();
