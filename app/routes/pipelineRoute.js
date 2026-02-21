const express = require("express");
const router = express.Router();
const EmployeeController = require("../controller/EmployeeController");

router.post("/create", EmployeeController.createEmployee);

router.get("/all", EmployeeController.getAllEmployees);

// router.post("/addFields", EmployeeController.addFields);
// router.get("/limit", EmployeeController.limit);
 router.get("/group", EmployeeController.group);
 router.get("/match", EmployeeController.match);
// router.post("/merge", EmployeeController.merge);
// router.post("/project", EmployeeController.project);
// router.get("/replaceRoot", EmployeeController.replaceRoot);
// router.post("/set", EmployeeController.set);
// router.get("/skip", EmployeeController.skip);
// router.get("/sort", EmployeeController.sort);
// router.get("/unwind", EmployeeController.unwind);

module.exports = router;
