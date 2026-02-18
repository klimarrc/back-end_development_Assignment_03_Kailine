import Joi from "joi";
import { get } from "node:http";

// Post operation schemas organized by request part
export const postSchemas = {
    // POST /posts - Create new post
    create: {
        body: Joi.object({
            id: Joi
            .string()
            .required()
            .messages({
                "number.base": "ID must be a number",
                "string.base": "ID must be a string",
                "string.empty": "ID is required",
                "any.required": "ID is required",
            }),
            name: Joi
            .string()
            .min(3)
            .max(100)
            .required()
            .default("Untitled Event")
            .messages({
                "string.base": "Name must be a string",
                "string.empty": "Name is required",
                "string.min": "Name must be at least 3 characters",
                "string.max": "Name must be at most 100 characters",
                "any.required": "Name is required",
            }),

            date: Joi
            .string()
            .isoDate()
            .required()
            .default(() => new Date().toISOString())
            .messages({
                "string.base": "Date must be a string in ISO format",
                "string.empty": "Date is required",
                "string.isoDate": "Date must be in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)",
                "any.required": "Date is required",
            }), 

            capacity: Joi
            .number()
            .integer()
            .min(5)
            .default(0)
            .messages({
                "number.base": "Capacity must be a number",
                "number.integer": "Capacity must be an integer",
                "number.min": "Capacity must be at least 5",
            }),

            registrationCount: Joi
            .number()
            .integer()
            .min(0)
            .default(0)
            .messages({
                "number.base": "Registration count must be a number",
                "number.integer": "Registration count must be an integer",
                "number.min": "Registration count cannot be negative",
            }), 

            status: Joi
            .string()
            .valid("active", "inactive", "cancelled")
            .default("active")
            .messages({
                "string.base": "Status must be a string",
                "string.empty": "Status is required",
                "any.only": "Status must be one of 'active', 'inactive', or 'cancelled'",
            }), 

            category: Joi
            .string()
            .valid("general", "conference", "workshop", "meetup")
            .default("general")
            .required()
            .messages({
                "string.base": "Category must be a string",
                "string.empty": "Category is required",
                "any.only": "Category must be one of 'general', 'conference', 'workshop', or 'meetup'",
                "any.required": "Category is required",
            }),      
            }),
        },
        // Get all posts - No body validation needed.
        getAll: {},
    
        // GET /posts/:id - Get post by ID
        getById: {
            params: Joi.object({
                id: Joi.string().required().messages({
                    "string.base": "ID must be a string",
                    "string.empty": "ID is required",
                    "any.required": "ID is required",
                }),
            }),
            query: Joi.object({
                include: Joi.string().valid("author", "comments").optional(),
            }),
        },

        // PUT /posts/:id - Update post by ID
        update: {
            params: Joi.object({
                id: Joi.string().required().messages({
                    "string.base": "ID must be a string",
                    "string.empty": "ID is required",
                    "any.required": "ID is required",
                }),
            }),
            body: Joi.object({
                name: Joi.string().min(3).max(100).optional().messages({
                    "string.base": "Name must be a string",
                    "string.empty": "Name cannot be empty",
                    "string.min": "Name must be at least 3 characters",
                    "string.max": "Name must be at most 100 characters",
                }),
                date: Joi.string().isoDate().optional()
                .messages({
                    "string.base": "Date must be a string in ISO format",
                    "string.empty": "Date cannot be empty",
                    "string.isoDate": "Date must be in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)",
                }),
                capacity: Joi.number().integer().min(5).optional()
                .messages({       
                    "number.base": "Capacity must be a number",     
                    "number.integer": "Capacity must be an integer",
                    "number.min": "Capacity must be at least 5",

                }),                                 

                registrationCount: Joi.number().integer().min(0).optional()
                .messages({
                    "number.base": "Registration count must be a number",
                    "number.integer": "Registration count must be an integer",
                    "number.min": "Registration count cannot be negative",
                }),
                status: Joi.string().valid("active", "inactive", "cancelled").optional().messages({
                    "string.base": "Status must be a string",
                    "string.empty": "Status cannot be empty",
                    "any.only": "Status must be one of 'active', 'inactive', or 'cancelled'",
                }),
                category: Joi.string().valid("general", "conference", "workshop", "meetup").optional()
                .messages({
                    "string.base": "Category must be a string",
                    "string.empty": "Category cannot be empty",
                    "any.only": "Category must be one of 'general', 'conference', 'workshop', or 'meetup'",
                }),
            }),
        },
        // DELETE /posts/:id - Delete post by ID
        delete: {
            params: Joi.object({
                id: Joi.string().required().messages({
                    "string.base": "ID must be a string",
                    "string.empty": "ID is required",
                    "any.required": "ID is required",
                }),
            }),
        },
    };

            