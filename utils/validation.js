//Validation
const Joi = require("@hapi/joi");
const { allow } = require("@hapi/joi");

//Login Validation
const loginValidation = (data) => {
	const schema = Joi.object({
		userName: Joi.string().required().messages({
			"string.empty": `User Name is required`,
		}),
		password: Joi.string().required().messages({
			"string.empty": `Password is required`,
		}),
	});
	return schema.validate(data, { abortEarly: false });
};

//Employee Validation
const employeeValidation = (data) => {
	const schema = Joi.object({
		employeeNo: Joi.string().required().messages({
			"string.empty": `Employee No. is required`,
		}),
		firstName: Joi.string().required().messages({
			"string.empty": `First Name is required`,
		}),
		middleName: Joi.string().allow(''),
		lastName: Joi.string().required().messages({
			"string.empty": `Last Name. is required`,
		}),
		suffix: Joi.string().allow(''),
		contactNo: Joi.string().allow(''),
		gender: Joi.string().allow(''),
		address: Joi.string().allow(''),
	});
	return schema.validate(data, { abortEarly: false });
};

module.exports.employeeValidation = employeeValidation;
