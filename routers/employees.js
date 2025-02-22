const router = require("express").Router();
const bcrypt = require("bcryptjs");
const verify = require("../utils/verifyToken");
const employeeModel = require("../models/employees");
const { employeeValidation } = require("../utils/validation");

//Insert new user to the database
router.post("/", async (request, response) => {
    //Validate before creating
    const { error } = employeeValidation(request.body);
    if (error) return response.status(400).send(error.details[0].message);

    //Check if employee number exist
    const employeeNoExist = await employeeModel.findOne({
        employeeNo: request.body.employeeNo,
    });
    if (employeeNoExist)
        return response.status(400).json({ message: "Employee No. is already taken." });

    //Create new user
    const newEmployee = new employeeModel({
        employeeNo: request.body.employeeNo,
        firstName: request.body.firstName,
        middleName: request.body.middleName,
        lastName: request.body.lastName,
        suffix: request.body.suffix,
        contactNo: request.body.contactNo,
        gender: request.body.gender,
        address: request.body.address,
    });
    try {
        const employee = await newEmployee.save();
        response.status(200).json({ employee: employee.employeeNo + " - " + employee.firstName });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (request, response) => {
    try {
        const employee = await employeeModel.findById(request.params.id);
        const updates = request.body;
        const options = { new: true };
        const updatedEmployee = await employeeModel.findByIdAndUpdate(
            employee,
            updates,
            options
        );
        response.status(200).json({ employee: updatedEmployee.employeeNo + " - " + updatedEmployee.firstName + " " + updatedEmployee.middleName + " " + updatedEmployee.lastName });
    } catch (error) {
        response.status(500).json({ error: "Error" });
    }
});

//List of Employee
router.post("/list", async (request, response) => {
    try {
        var page = request.body.page !== "" ? request.body.page : 0;
        var perPage = 20;
        var id = [];
        var employees = [];

        employees = await employeeModel.find({
            IsDeleted: false
        }).skip((page) * perPage).limit(perPage).sort('lastName');


        var data = [];
        for (const i in employees) {
            var emp = {
                "_id": employees[i]._id,
                "employeeNo": employees[i].employeeNo,
                "firstName": employees[i].firstName,
                "middleName": employees[i].middleName,
                "lastName": employees[i].lastName,
                "suffix": employees[i].suffix,
                "contactNo": employees[i].contactNo,
                "gender": employees[i].gender,
                "address": employees[i].address,
            }
            data.push(emp);
        }

        response.status(200).json(data);

    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

// list total employee
router.post("/total-employees", async (request, response) => {
    try {
        var data = [];

        data = await employeeModel.find({ IsDeleted: false });

        response.status(200).json(data.length);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

//For search options get method
router.get("/options", async (request, response) => {
    try {
        const employees = await employeeModel.find({ IsDeleted: false }).sort('lastName');
        response.status(200).json(employees);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

//For search options
router.post("/employee-options", async (request, response) => {
    try {
        var id = [];
        var paramDep = request.body.selectedDepartment;
        for (const i in paramDep) {
            id.push({ department: request.body.selectedDepartment[i].value });
        }
        var employees = [];
        if (Object.keys(request.body.selectedDepartment).length > 0) {
            employees = await employeeModel.find({
                '$or': id,
                IsDeleted: false
            }).sort('lastName');
        } else {
            employees = await employeeModel.find({
                IsDeleted: false
            }).sort('lastName');
        };
        response.status(200).json(employees);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

//Delete user from the database based on id
router.delete("/:id", async (request, response) => {
    try {
        const employee = await employeeModel.findById(request.params.id);
        const updates = { IsDeleted: true };
        const options = { new: true };
        const deletedEmployee = await employeeModel.findByIdAndUpdate(
            employee,
            updates,
            options
        );
        response.status(200).json(deletedEmployee);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

module.exports = router;
