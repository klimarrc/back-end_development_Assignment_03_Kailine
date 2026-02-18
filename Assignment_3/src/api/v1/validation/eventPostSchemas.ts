import Joi from "joi";

// Post operation schemas organized by request part
export const postSchemas = {
    // POST /posts - Create new post
    create: {
        name: Joi
        .string()
        .min(3)
        .max(100)
        .required()
        .messages({
            "string.base": "Name must be a string",
            "string.empty": "Name is required",
            "string.min": "Name must be at least 3 characters",
            "string.max": "Name must be at most 100 characters",
            "any.required": "Name is required"
        }),
        date: Joi
        .isoDate()
        .required()
        .messages({
            "date.base": "Date must be a valid date",
            "any.required": "Date is required",
            "string.isoDate": "Date must be in ISO format (YYYY-MM-DD)"
        }),
        capacity: Joi
        .number()
        .integer()
        .min(0)
        .max(10000)
        .optional()
        .messages({
            "any.required": "Capacity is required",
            "number.base": "Capacity must be a number",
            "number.integer": "Capacity must be an integer",
            "number.min": "Capacity must be a positive number"
        }),
        registrationCount: Joi
        .number()
        .integer()
        .min(0)
        .required()
        .messages({
            "any.required": "Registration count is required",
            "number.base": "Registration count must be a number",
            "number.integer": "Registration count must be an integer",
            "number.min": "Registration count must be a positive number"
        }),
        status: Joi
        .string()
        .valid("active", "cancelled", "completed")
        .required()
        .messages({
            "any.required": "Status is required",
            "string.base": "Status must be a string",   
            "any.only": "Status must be one of 'active', 'cancelled', or 'completed'"
        }),
        category: Joi
        .string()
        .valid("conference", "workshop", "seminar", "webinar")
        .required()
        .messages({
            "any.required": "Category is required",
            "string.base": "Category must be a string",
            "any.only": "Category must be one of 'conference', 'workshop', 'seminar', or 'webinar'"
        }),                                                         
    }
};  
        